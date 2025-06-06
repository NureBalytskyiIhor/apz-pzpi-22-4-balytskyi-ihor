import { useState, useEffect } from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import Sidebar from './components/Sidebar';
import Collections from './pages/Collections';
import Donations from './pages/Donations';
import MyCollections from './pages/MyCollections';
import Profile from './pages/Profile';
import DonationDetails from './pages/DonationDetails';
import DonatePage from './pages/DonatePage';
import EditProfile from './pages/EditProfile';
import CreateCollection from './pages/CreateCollection';
import AdminPanel from './pages/AdminPanel';
import AdminUsers from './pages/AdminUsers';
import AdminCollections from './pages/AdminCollections';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const { i18n } = useTranslation();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ua' ? 'en' : 'ua';
    i18n.changeLanguage(newLang);
  };

  if (!user) {
    return isLogin ? (
      <Login switchToRegister={() => setIsLogin(false)} onLogin={setUser} />
    ) : (
      <Register switchToLogin={() => setIsLogin(true)} onRegister={setUser} />
    );
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar user={user} />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-end mb-4 space-x-4">
            <button onClick={toggleLanguage} className="text-blue-600">
              🌐 {i18n.language === 'ua' ? 'UA' : 'EN'}
            </button>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Вийти
            </button>
          </div>
          <Routes>
            <Route path="/" element={<Collections />} />
            <Route path="/donations" element={<Donations user={user} />} />
            <Route path="/donation/:id" element={<DonationDetails user={user} />} />
            <Route path="/donation/:id/donate" element={<DonatePage user={user} />} />
            <Route
              path="/my-collections"
              element={user.isVerified ? (
                <MyCollections user={user} />
              ) : (
                <div className="text-center text-gray-600">
                  Щоб мати доступ до цієї вкладки, потрібно пройти верифікацію.
                </div>
              )}
            />
            <Route path="/my-collections/create" element={<CreateCollection user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/profile/edit" element={<EditProfile user={user} onUpdate={setUser} />} />
            {user.isAdmin && (
              <>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/collections" element={<AdminCollections />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
