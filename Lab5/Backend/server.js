const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users', require('./routes/users'))
app.use('/api/donations', require('./routes/donations'))
app.use('/api', require('./routes/donationLogs'))
app.use('/api/admin', require('./routes/admin'));

//

app.get('/', (req, res) => {
  res.send('Backend працює')
})


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('Запущено на http://localhost:5000')
    })
  })
  .catch(err => console.error('Помилка підключення до MongoDB:', err))
