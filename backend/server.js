const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const tripRoutes = require('./routes/tripRoutes')

connectDB()

const app = express()

app.use(
  cors({
    origin: [
      'https://ai-travel-planner-three-dun.vercel.app',
      'http://localhost:5173',
    ],
  }),
)

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