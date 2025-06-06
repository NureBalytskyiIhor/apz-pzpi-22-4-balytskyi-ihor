import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Sidebar({ user }) {
  const { t } = useTranslation();

  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-bold mb-4">{t('nav.title')}</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:underline ${isActive ? 'font-bold text-blue-700' : 'text-blue-600'}`
          }
        >
          {t('nav.collections')}
        </NavLink>
        <NavLink
          to="/donations"
          className={({ isActive }) =>
            `hover:underline ${isActive ? 'font-bold text-blue-700' : 'text-blue-600'}`
          }
        >
          {t('nav.donations')}
        </NavLink>
        <NavLink
          to="/my-collections"
          className={({ isActive }) =>
            `hover:underline ${isActive ? 'font-bold text-blue-700' : 'text-blue-600'}`
          }
        >
          {t('nav.myCollections')}
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `hover:underline ${isActive ? 'font-bold text-blue-700' : 'text-blue-600'}`
          }
        >
          {t('nav.profile')}
        </NavLink>
        {user?.isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `hover:underline ${isActive ? 'font-bold text-red-700' : 'text-red-600'}`
            }
          >
            🛠 {t('nav.admin')}
          </NavLink>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
