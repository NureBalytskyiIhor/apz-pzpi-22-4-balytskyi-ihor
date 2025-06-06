const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Donation = require('../models/Donation');
const DonationLog = require('../models/DonationLog');

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (!user) {
      return res.status(401).json({ message: 'Невірний email або пароль' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера' })
  }
})

// POST /api/users/register
router.post('/register', async (req, res) => {
  const { name, email, password, isVerified } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' })
    }

    const newUser = new User({ name, email, password, isVerified: !!isVerified })
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера' })
  }
})

// PATCH /api/users/:id
router.patch('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Помилка оновлення профілю' });
  }
});

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні користувачів' });
  }
});

// PATCH /api/users/:id/verify
router.patch('/:id/verify', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

    user.isVerified = !user.isVerified;
    await user.save();

    res.json({ message: 'Статус верифікації змінено', user });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при оновленні користувача' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

    await Donation.deleteMany({ creatorId: userId });

    await DonationLog.deleteMany({ userId });

    await user.deleteOne();

    res.json({ message: 'Користувача і повʼязані дані видалено' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при повному видаленні користувача' });
  }
});

module.exports = router
