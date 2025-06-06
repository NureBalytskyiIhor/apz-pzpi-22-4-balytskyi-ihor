const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  id: String,
  date: String,
  content: String
})

const donationSchema = new mongoose.Schema({
  _id: String, 
  title: String,
  goal: Number,
  description: String,
  raised: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Number,
    default: Date.now
  },
  creatorId: String,
  news: [newsSchema]
})



module.exports = mongoose.model('Donation', donationSchema)
