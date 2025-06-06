import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Profile({ user }) {
  const { t } = useTranslation();

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{t('profile_section.title')}</h1>

      <p className="mb-2">
        <span className="font-semibold">{t('profile_section.name')}:</span> {user.name}
      </p>
      <p className="mb-2">
        <span className="font-semibold">{t('profile_section.email')}:</span> {user.email}
      </p>
      <p className="mb-4">
        <span className="font-semibold">{t('profile_section.status')}:</span>{' '}
        {user.isVerified ? (
          <span className="text-green-600 font-semibold">{t('profile_section.verified')}</span>
        ) : (
          <span className="text-red-500 font-semibold">{t('profile_section.notVerified')}</span>
        )}
      </p>

      <Link
        to="/profile/edit"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t('profile_section.editButton')}
      </Link>
    </div>
  );
}

export default Profile;
