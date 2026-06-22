const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
})

const daySchema = new mongoose.Schema({
  dayNumber: Number,
  activities: [activitySchema],
})

const hotelSchema = new mongoose.Schema({
  name: String,
  price: Number,
})

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    durationDays: {
      type: Number,
      required: true,
    },

    budgetTier: {
      type: String,
      required: true,
    },

    interests: [String],

    itinerary: [daySchema],

    estimatedBudget: {
      transport: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      total: Number,
    },

    hotels: [hotelSchema],

    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Trip', tripSchema)