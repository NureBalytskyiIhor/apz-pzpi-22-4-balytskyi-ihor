import { useEffect, useState } from 'react';
import api from '../api';
import { useTranslation } from 'react-i18next';

function AdminUsers() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Помилка при отриманні користувачів:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleVerify = async (id) => {
    try {
      await api.patch(`/users/${id}/verify`);
      fetchUsers();
    } catch (err) {
      console.error('Помилка при оновленні статусу:', err);
    }
  };

  const handleDelete = async (user) => {
    try {
      const donations = await api.get(`/donations/user/${user._id}`);
      if (donations.data.length > 0 && user.isVerified) {
        const confirmDelete = window.confirm(
          t('admin.confirmWithCollections')
        );
        if (!confirmDelete) return;
      }

      await api.delete(`/users/${user._id}`);
      fetchUsers();
    } catch (err) {
      console.error('Помилка при видаленні користувача:', err);
    }
  };

  const filtered = users.filter((u) => {
    const term = search.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'verified' && u.isVerified) ||
      (filter === 'unverified' && !u.isVerified);
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('admin.manageUsers')}</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
        <input
          type="text"
          placeholder={t('admin.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-64"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-2 sm:mt-0 border p-2 rounded"
        >
          <option value="all">{t('admin.filter.all')}</option>
          <option value="verified">{t('admin.filter.verified')}</option>
          <option value="unverified">{t('admin.filter.unverified')}</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">{t('admin.name')}</th>
            <th className="p-2">Email</th>
            <th className="p-2">{t('admin.status')}</th>
            <th className="p-2">{t('admin.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                {user.isVerified ? t('admin.verified') : t('admin.unverified')}
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleVerify(user._id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  {t('admin.toggleVerification')}
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  {t('admin.delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
