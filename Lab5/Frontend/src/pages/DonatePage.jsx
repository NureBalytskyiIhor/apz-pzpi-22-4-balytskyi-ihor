import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function DonatePage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [cardName, setCardName] = useState(user.name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || isNaN(amount)) {
      setError('Вкажіть коректну суму');
      return;
    }

    try {
      await api.post(`/donations/${id}/donate`, {
        userId: user._id,
        amount: Number(amount)
      });
      setSuccess(true);
      setTimeout(() => navigate('/donations'), 1500);
    } catch (err) {
      setError('Помилка під час донату');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Підтвердження донату</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Дякуємо за вашу підтримку!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Сума (₴)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Імʼя на карті (необов’язково)"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Номер картки (необов’язково)"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="MM / YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Підтвердити донат
        </button>
      </form>
    </div>
  );
}

export default DonatePage;
