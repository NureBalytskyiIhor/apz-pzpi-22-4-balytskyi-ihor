const express = require('express')
const router = express.Router()
const DonationLog = require('../models/DonationLog')
const Donation = require('../models/Donation')

// POST /api/donations/:id/donate
router.post('/donations/:id/donate', async (req, res) => {
  const { userId, amount } = req.body

  if (!userId || !amount) {
    return res.status(400).json({ message: 'userId та amount обов’язкові' })
  }

  try {
    const donation = await Donation.findById(req.params.id)
    if (!donation) return res.status(404).json({ message: 'Збір не знайдено' })

    // створюємо лог
    const log = new DonationLog({
      userId,
      donationId: donation.id,
      amount,
      date: new Date().toLocaleDateString('uk-UA')
    })
    await log.save()

    // оновлюємо зібрану суму
    donation.raised += amount
    await donation.save()

    res.status(201).json({ message: 'Донат збережено', log })
  } catch (error) {
    res.status(500).json({ message: 'Помилка обробки донату' })
  }
})

// GET /api/donation-logs/:userId
router.get('/donation-logs/:userId', async (req, res) => {
  try {
    const logs = await DonationLog.find({ userId: req.params.userId })
    res.json(logs)
  } catch (error) {
    res.status(500).json({ message: 'Помилка отримання логів' })
  }
})

module.exports = router
