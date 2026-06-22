import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const [trips, setTrips] = useState([])

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken')

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/trips`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      setTrips(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTrip = async tripId => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this trip?',
    )

    if (!confirmDelete) {
      return
    }

    try {
      const jwtToken = localStorage.getItem('jwtToken')

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/trips/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      setTrips(prevTrips =>
        prevTrips.filter(eachTrip => eachTrip._id !== tripId),
      )
    } catch (error) {
      console.log(error)
    }
  }

  const onClickLogout = () => {
    localStorage.removeItem('jwtToken')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 px-10 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold text-slate-800">
          ✈️ AI Travel Planner
        </h1>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl shadow-md"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>

      <Link to="/create-trip">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg mb-10 font-semibold">
          + Create Trip
        </button>
      </Link>

      {trips.length === 0 ? (
        <div className="flex justify-center items-center mt-20">
          <h1 className="text-2xl text-gray-500">
            No trips created yet
          </h1>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map(eachTrip => (
            <div
              key={eachTrip._id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-2xl
                transition
                duration-300
                p-6
              "
            >
              <h1 className="text-3xl font-bold text-slate-800 mb-5">
                📍 {eachTrip.destination}
              </h1>

              <div className="space-y-2 text-gray-700 mb-6">
                <p>🗓️ {eachTrip.durationDays} Days</p>

                <p>💰 {eachTrip.budgetTier} Budget</p>
              </div>

              <Link to={`/trip/${eachTrip._id}`}>
                <button
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    w-full
                    py-3
                    rounded-xl
                    font-semibold
                    shadow-md
                  "
                >
                  View Details
                </button>
              </Link>

              <button
                onClick={() => deleteTrip(eachTrip._id)}
                className="
                  mt-4
                  text-red-500
                  hover:text-red-700
                  font-medium
                  w-full
                "
              >
                🗑 Delete Trip
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard