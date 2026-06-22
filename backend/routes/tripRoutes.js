const express = require('express')
const authenticateToken = require('../middleware/authenticateToken')

const {
  generateTrip,
  getTrips,
  getTripById,
  deleteTrip,
} = require('../controllers/tripController')

const router = express.Router()

router.post('/generate', authenticateToken, generateTrip)

router.get('/', authenticateToken, getTrips)

router.get('/:id', authenticateToken, getTripById)

router.delete('/:id', authenticateToken, deleteTrip)

module.exports = router