import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';

function DonationDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [donation, setDonation] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [newsError, setNewsError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/donations/${id}`);
        setDonation(res.data);
      } catch (err) {
        setError(t('donationDetails.loadError'));
      }
    };
    fetchData();
  }, [id, t]);

  const handleAddNews = async (e) => {
    e.preventDefault();
    setNewsError('');
    if (!title || !text) {
      setNewsError(t('donationDetails.requiredFields'));
      return;
    }
    try {
      const res = await api.post(`/donations/${id}/news`, {
        title,
        content: text,
      });
      setDonation((prev) => ({
        ...prev,
        news: [...prev.news, res.data.news],
      }));
      setTitle('');
      setText('');
      setShowForm(false);
    } catch (err) {
      setNewsError(t('donationDetails.newsError'));
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!donation) return <div>{t('donationDetails.loading')}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{donation.title}</h1>
      <p className="text-gray-700 mb-2">
        {t('donationDetails.goal')}: {donation.goal} ₴
      </p>
      <p className="text-gray-700 mb-4">
        {t('donationDetails.raised')}: {donation.raised} ₴
      </p>
      <p className="mb-6 whitespace-pre-line">{donation.description}</p>

      <button
        onClick={() => navigate(`/donation/${id}/donate`)}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-6"
      >
        {t('donationDetails.donate')}
      </button>

      {user && user._id === donation.creatorId && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showForm
              ? t('donationDetails.cancel')
              : t('donationDetails.addNews')}
          </button>

          {showForm && (
            <form onSubmit={handleAddNews} className="mt-4 space-y-3">
              {newsError && (
                <p className="text-red-500 text-sm">{newsError}</p>
              )}
              <input
                type="text"
                placeholder={t('donationDetails.newsTitle')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder={t('donationDetails.newsText')}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border p-2 rounded"
                rows={4}
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {t('donationDetails.submitNews')}
              </button>
            </form>
          )}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">
        {t('donationDetails.newsHeader')}
      </h2>
      {donation.news.length === 0 ? (
        <p className="text-gray-500">{t('donationDetails.noNews')}</p>
      ) : (
        <ul className="space-y-2">
          {[...donation.news].reverse().map((item) => (
            <li key={item.id} className="border p-2 rounded">
              <p className="text-sm text-gray-500">{item.date}</p>
              <pre className="whitespace-pre-wrap">{item.content}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonationDetails;
