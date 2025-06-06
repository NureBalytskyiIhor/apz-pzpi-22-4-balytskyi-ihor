import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AdminPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleExport = async () => {
    try {
      const res = await api.get('/admin/export', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'backup.json');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Помилка при експорті');
      console.error(err);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target.result);
        await api.post('/admin/import', json);
        alert('Імпорт виконано успішно');
      } catch (err) {
        alert('Помилка при імпорті');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-red-600">
        🛠 {t('admin.title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">{t('admin.users')}</h2>
          <p className="text-gray-600 mb-2">{t('admin.usersHint')}</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate('/admin/users')}
          >
            {t('admin.manageUsers')}
          </button>
        </div>

        <div className="bg-white border rounded p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">{t('admin.collections')}</h2>
          <p className="text-gray-600 mb-2">{t('admin.collectionsHint')}</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate('/admin/collections')}
          >
            {t('admin.manageCollections')}
          </button>
        </div>

        <div className="bg-white border rounded p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">{t('admin.backup')}</h2>
          <p className="text-gray-600 mb-2">{t('admin.backupHint')}</p>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {t('admin.export')}
          </button>
        </div>

        <div className="bg-white border rounded p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">{t('admin.import')}</h2>
          <p className="text-gray-600 mb-2">{t('admin.importHint')}</p>
          <label className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            {t('admin.import')}
            <input
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
