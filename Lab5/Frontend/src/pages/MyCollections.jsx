import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';

function MyCollections({ user }) {
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const res = await api.get(`/donations/user/${user._id}`);
        setMyDonations(res.data);
      } catch (err) {
        console.error('Помилка при завантаженні зборів:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchMyDonations();
    }
  }, [user]);

  if (loading) return <p>{t('myCollections.loading')}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('myCollections.title')}</h1>
        <Link
          to="/my-collections/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {t('myCollections.createButton')}
        </Link>
      </div>

      {myDonations.length === 0 ? (
        <p className="text-gray-500">{t('myCollections.noDonations')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myDonations.map((donation) => (
            <Link
              to={`/donation/${donation._id}`}
              key={donation._id}
              className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition block"
            >
              <h2 className="text-lg font-semibold mb-2">{donation.title}</h2>
              <p className="text-sm text-gray-600 mb-1">
                {t('myCollections.goal')}: {donation.goal} ₴
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {t('myCollections.raised')}: {donation.raised} ₴
              </p>
              <p className="text-sm text-gray-500">
                {t('myCollections.created')}: {new Date(donation.timestamp).toLocaleDateString('uk-UA')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCollections;
