import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function CreateCollection({ user }) {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !goal || isNaN(goal)) {
      setError('Заповніть усі поля коректно');
      return;
    }

    try {
      await api.post('/donations', {
        title,
        goal: Number(goal),
        description,
        creatorId: user._id
      });
      setSuccess(true);
      setTimeout(() => navigate('/my-collections'), 1500);
    } catch (err) {
      setError('Помилка створення збору');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Створити новий збір</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Збір успішно створено!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Назва збору"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Мета (сума в ₴)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Опис збору"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />

        <div className="text-sm text-gray-500">
          Прикріплення файлів
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Створити збір
        </button>
      </form>
    </div>
  );
}

export default CreateCollection;
