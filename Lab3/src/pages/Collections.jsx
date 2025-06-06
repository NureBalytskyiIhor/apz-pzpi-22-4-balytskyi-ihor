import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Collections() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState('');
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await api.get('/donations');
        setDonations(res.data);
      } catch (err) {
        console.error('Помилка отримання зборів:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const filtered = donations
    .filter((d) => d.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortNewestFirst ? b.timestamp - a.timestamp : a.timestamp - b.timestamp));

  if (loading) return <p>{t('collections.loading')}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('collections.title')}</h1>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <input
          type="text"
          placeholder={t('collections.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <button
          onClick={() => setSortNewestFirst((prev) => !prev)}
          className="mt-2 sm:mt-0 bg-gray-200 px-4 py-2 rounded"
        >
          {sortNewestFirst ? t('collections.sortNewest') : t('collections.sortOldest')}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">{t('collections.noResults')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((donation) => (
            <div
              key={donation._id}
              className="bg-white border rounded p-4 shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg mb-1">{donation.title}</h2>
              <p className="text-sm text-gray-600 mb-1">
                {t('collections.goal')}: {donation.goal} ₴
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {t('collections.raised')}: {donation.raised} ₴
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {t('collections.created')}: {new Date(donation.timestamp).toLocaleDateString('uk-UA')}
              </p>
              <Link
                to={`/donation/${donation._id}`}
                className="text-blue-600 hover:underline"
              >
                {t('collections.more')}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collections;
