const mongoose = require('mongoose')

const donationLogSchema = new mongoose.Schema({
  userId: String,
  donationId: String,
  amount: Number,
  date: String
})

module.exports = mongoose.model('DonationLog', donationLogSchema)
