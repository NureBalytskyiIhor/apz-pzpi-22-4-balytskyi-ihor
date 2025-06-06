import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api';

function Register({ switchToLogin, onRegister }) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/users/register', {
        name,
        email,
        password,
      });
      const user = res.data;
      onRegister(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка реєстрації');
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ua' ? 'en' : 'ua');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <div className="absolute top-4 right-6">
        <button onClick={toggleLanguage} className="text-blue-600">
          🌐 {i18n.language.toUpperCase()}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-6 text-center">{t('register')}</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          type="text"
          placeholder={t('name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {t('register')}
        </button>
        <p className="mt-4 text-sm text-center">
          {t('have_account')} 
          <button type="button" onClick={switchToLogin} className="text-blue-600 hover:underline">
            {t('login')}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
