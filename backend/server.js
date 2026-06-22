const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const authenticateToken = require('./middleware/authenticateToken')
const tripRoutes = require('./routes/tripRoutes')

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/trips', tripRoutes)

app.get('/', (request, response) => {
  response.send('AI Travel Planner Backend Running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


app.get('/api/test', authenticateToken, (request, response) => {
  response.json({
    message: 'Protected route accessed',
    user: request.user,
  })
})