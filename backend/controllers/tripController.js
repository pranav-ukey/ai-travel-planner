const Trip = require('../models/Trip')
const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const generateTrip = async (request, response) => {
  try {
    const {destination, durationDays, budgetTier, interests} = request.body

    if (!destination || !destination.trim()) {
      return response.status(400).json({
        message: 'Destination is required',
      })
    }

    if (!Number.isInteger(durationDays) || durationDays < 1 || durationDays > 14) {
      return response.status(400).json({
        message: 'Duration must be between 1 and 14 days',
      })
    }

    const validBudgetTiers = ['Low', 'Medium', 'High']

    if (!validBudgetTiers.includes(budgetTier)) {
      return response.status(400).json({
        message: 'Budget tier must be Low, Medium, or High',
      })
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      return response.status(400).json({
        message: 'At least one interest is required',
      })
    }

    const userId = request.user.id

    const prompt = `
Generate a ${durationDays}-day trip for ${destination}.

Budget: ${budgetTier}

All prices must be in INR.
Hotel price must be per night.

Interests: ${interests.join(', ')}

Return only raw JSON.
Do not use markdown.
Do not wrap the response inside triple backticks.
Do not add explanations.

Use this format:  

{
  "itinerary":[
    {
      "dayNumber":1,
      "activities":[
        {
          "title":"Activity Name",
          "description":"Short description"
        }
      ]
    }
  ],
  "estimatedBudget":{
    "transport":0,
    "accommodation":0,
    "food":0,
    "activities":0,
    "total":0
  },
  "hotels":[
    {
      "name":"Hotel Name",
      "price":100
    }
  ]
}
`

    let result

    try {
      const geminiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      })

      let responseText = geminiResponse.text

      responseText = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      result = JSON.parse(responseText)
      if (
        !Array.isArray(result.itinerary) ||
        !result.estimatedBudget ||
        !result.hotels
      ) {
        return response.status(500).json({
          message: 'Failed to generate trip',
        })
      }
    } catch (error) {
      console.log('Gemini Error:', error.message)

      return response.status(500).json({
        message: 'Failed to generate trip using AI',
      })
    }

    const newTrip = new Trip({
      userId,
      destination,
      durationDays,
      budgetTier,
      interests,
      itinerary: result.itinerary,
      estimatedBudget: result.estimatedBudget,
      hotels: result.hotels,
    })

    const savedTrip = await newTrip.save()

    response.status(201).json(savedTrip)
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
}


const getTrips = async (request, response) => {
  try {
    const trips = await Trip.find({
      userId: request.user.id,
    })

    response.status(200).json(trips)
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
}


const getTripById = async (request, response) => {
  try {
    const trip = await Trip.findOne({
      _id: request.params.id,
      userId: request.user.id,
    })

    if (!trip) {
      return response.status(404).json({
        message: 'Trip not found',
      })
    }

    response.status(200).json(trip)
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
}


const deleteTrip = async (request, response) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: request.params.id,
      userId: request.user.id,
    })

    if (!trip) {
      return response.status(404).json({
        message: 'Trip not found',
      })
    }

    response.status(200).json({
      message: 'Trip deleted successfully',
    })
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
}


module.exports = {
  generateTrip,
  getTrips,
  getTripById,
  deleteTrip,
}

