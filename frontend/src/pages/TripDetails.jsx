import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const TripDetails = () => {
  const {id} = useParams()

  const [trip, setTrip] = useState(null)

  useEffect(() => {
    fetchTrip()
  }, [])

  const fetchTrip = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken')

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/trips/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      setTrip(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-5xl font-bold text-slate-800 mb-10">
        📍 {trip.destination}
      </h1>

      <h2 className="text-2xl font-bold mb-4">
        Itinerary
      </h2>

      {trip.itinerary.map(day => (
        <div key={day._id} className="bg-white shadow-lg rounded-xl p-6 mb-6 transition hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Day {day.dayNumber}
          </h2>

          {day.activities.map(activity => (
            <div key={activity._id} className="border-l-4 border-blue-500 pl-4 mb-4">
              <h3 className="text-lg font-semibold">
                <strong>{activity.title}</strong>
              </h3>

              <p className="text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      ))}

      <div className="bg-green-100 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Budget Breakdown
        </h2>

        <div className="space-y-2 text-lg">
          <p>🚗 Transport: ₹{trip.estimatedBudget.transport}</p>

          <p>🏨 Accommodation: ₹{trip.estimatedBudget.accommodation}</p>

          <p>🍽️ Food: ₹{trip.estimatedBudget.food}</p>

          <p>🎯 Activities: ₹{trip.estimatedBudget.activities}</p>

          <hr className="my-3" />

          <p className="text-2xl font-bold">
            Total: ₹{trip.estimatedBudget.total}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-5">
        Recommended Hotels
      </h2>

      {trip.hotels.map(hotel => (
        <div
          key={hotel._id}
          className="bg-white shadow-lg rounded-xl p-5 mb-5"
        >
          <h3 className="text-xl font-semibold text-slate-800">
            🏨 {hotel.name}
          </h3>

          <p className="text-green-600 text-lg mt-2">
            ₹{hotel.price} / night
          </p>
        </div>
      ))}
    </div>
  )
}

export default TripDetails