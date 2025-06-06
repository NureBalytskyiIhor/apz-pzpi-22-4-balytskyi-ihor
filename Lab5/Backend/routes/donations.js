const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Donation = require('../models/Donation');

// GET /api/donations
router.get('/', async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});

// GET /api/donations/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDonations = await Donation.find({ creatorId: userId });
    res.json(userDonations);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні зборів користувача' });
  }
});

// GET /api/donations/:id
router.get('/:id', async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  if (!donation) return res.status(404).json({ message: 'Збір не знайдено' });
  res.json(donation);
});

// POST /api/donations/:id/news
router.post('/:id/news', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Потрібен заголовок і текст новини' });
  }

  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Збір не знайдено' });

    const newsItem = {
      id: new Date().getTime().toString(),
      date: new Date().toLocaleDateString('uk-UA'),
      content: `📰 ${title}\n\n${content}`
    };

    donation.news.push(newsItem);
    await donation.save();

    res.status(201).json({ message: 'Новину додано', news: newsItem });
  } catch (error) {
    res.status(500).json({ message: 'Помилка додавання новини' });
  }
});

// POST /api/donations
router.post('/', async (req, res) => {
  const { title, goal, creatorId, description } = req.body;
  const newDonation = new Donation({
    _id: new mongoose.Types.ObjectId().toHexString(),
    title,
    goal,
    description,
    creatorId,
    raised: 0,
    news: [],
    timestamp: Date.now()
  });

  try {
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ message: 'Помилка створення збору' });
  }
});

// DELETE /api/donations/:id
router.delete('/:id', async (req, res) => {
  console.log('DELETE /donations/:id triggered');
  try {
    const deleted = await Donation.findOneAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Збір не знайдено' });
    }
    res.json({ message: 'Збір видалено' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при видаленні збору' });
  }
});

module.exports = router;
