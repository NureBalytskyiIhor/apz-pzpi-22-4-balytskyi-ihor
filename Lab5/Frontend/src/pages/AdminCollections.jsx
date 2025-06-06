import { useEffect, useState } from 'react';
import api from '../api';
import { useTranslation } from 'react-i18next';

function AdminCollections() {
  const { t } = useTranslation();
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState('');

  const fetchDonations = async () => {
    try {
      const res = await api.get('/donations');
      setDonations(res.data);
    } catch (err) {
      console.error('Помилка при отриманні зборів:', err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      t('adminCollections.confirmDelete', { title })
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/donations/${id}`);
      fetchDonations();
    } catch (err) {
      console.error('Помилка при видаленні збору:', err);
    }
  };

  const filtered = donations.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('admin.manageCollections')}</h1>

      <input
        type="text"
        placeholder={t('adminCollections.searchPlaceholder')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full sm:w-64"
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">{t('adminCollections.title')}</th>
            <th className="p-2">{t('adminCollections.goal')}</th>
            <th className="p-2">{t('adminCollections.raised')}</th>
            <th className="p-2">{t('adminCollections.creator')}</th>
            <th className="p-2">{t('admin.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d._id} className="border-t">
              <td className="p-2">{d.title}</td>
              <td className="p-2">{d.goal} ₴</td>
              <td className="p-2">{d.raised} ₴</td>
              <td className="p-2 text-xs text-gray-600">{d.creatorId}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(d._id, d.title)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
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

export default AdminCollections;
