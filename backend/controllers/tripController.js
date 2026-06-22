const Trip = require('../models/Trip')
const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const generateTrip = async (request, response) => {
  try {
    const {destination, durationDays, budgetTier, interests} = request.body

    const userId = request.user.id

    const prompt = `
Generate a ${durationDays}-day trip for ${destination}.

Budget: ${budgetTier}

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

      console.log(responseText)

      responseText = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      result = JSON.parse(responseText)
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

