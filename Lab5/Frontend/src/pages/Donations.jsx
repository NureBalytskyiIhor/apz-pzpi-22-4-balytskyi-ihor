import { useEffect, useState } from 'react';
import api from '../api';
import { useTranslation } from 'react-i18next';

function Donations({ user }) {
  const [logs, setLogs] = useState([]);
  const [donationNames, setDonationNames] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/donation-logs/${user._id}`);
        setLogs(res.data);

        const ids = res.data.map((log) => log.donationId);
        const unique = [...new Set(ids)];

        const promises = unique.map((id) => api.get(`/donations/${id}`));
        const results = await Promise.all(promises);

        const map = {};
        results.forEach((r) => (map[r.data._id] = r.data.title));
        setDonationNames(map);
      } catch (err) {
        console.error('Помилка при завантаженні донатів:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p>{t('donations.loading')}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('donations.title')}</h1>

      {logs.length === 0 ? (
        <p className="text-gray-500">{t('donations.noDonations')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {logs.map((log, i) => (
            <div
              key={i}
              className="bg-white border rounded p-4 shadow hover:shadow-md transition relative"
            >
              <h2 className="font-semibold text-lg mb-1">
                {donationNames[log.donationId] || t('donations.unknownDonation')}
              </h2>
              <p className="text-sm text-gray-700 mb-1">
                {t('donations.amount')}: {log.amount} ₴
              </p>
              <p className="text-sm text-gray-600">{t('donations.date')}: {log.date}</p>
              <span className="absolute bottom-1 right-2 text-xs text-gray-400">
                ID: {log.donationId}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Donations;
