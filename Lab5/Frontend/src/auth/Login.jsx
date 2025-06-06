import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api';

function Login({ switchToRegister, onLogin }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/users/login', { email, password });
      const user = res.data;
      onLogin(user);
      if (remember) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка авторизації');
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
        <h2 className="text-xl font-semibold mb-4 text-center">{t('login')}</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

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
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2"
          />
          {t('remember')}
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {t('login')}
        </button>
        <p className="mt-4 text-sm text-center">
          {t('no_account')} 
          <button type="button" onClick={switchToRegister} className="text-blue-600 hover:underline">
            {t('register')}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
