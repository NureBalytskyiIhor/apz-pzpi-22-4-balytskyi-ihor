const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Donation = require('../models/Donation');
const DonationLog = require('../models/DonationLog');

// GET /api/admin/export
router.get('/export', async (req, res) => {
  try {
    const users = await User.find();
    const donations = await Donation.find();
    const donationLogs = await DonationLog.find();

    const backup = {
      users,
      donations,
      donationLogs
    };

    res.setHeader('Content-Disposition', 'attachment; filename="backup.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(backup, null, 2));
  } catch (error) {
    console.error('Помилка експорту:', error);
    res.status(500).json({ message: 'Помилка експорту' });
  }
});

// POST /api/admin/import
router.post('/import', async (req, res) => {
  try {
    const { users, donations, donationLogs } = req.body;

    if (!users || !donations || !donationLogs) {
      return res.status(400).json({ message: 'Некоректна структура файлу' });
    }

    await User.deleteMany();
    await Donation.deleteMany();
    await DonationLog.deleteMany();

    await User.insertMany(users);
    await Donation.insertMany(donations);
    await DonationLog.insertMany(donationLogs);

    res.json({ message: 'Імпорт виконано успішно' });
  } catch (error) {
    console.error('Помилка імпорту:', error);
    res.status(500).json({ message: 'Помилка імпорту' });
  }
});

module.exports = router;
