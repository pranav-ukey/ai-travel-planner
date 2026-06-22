import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Select from 'react-select'

const interestOptions = [
  {value: 'Food', label: '🍜 Food'},
  {value: 'Culture', label: '🏛️ Culture'},
  {value: 'Adventure', label: '🏔️ Adventure'},
  {value: 'Shopping', label: '🛍️ Shopping'},
  {value: 'Nature', label: '🌿 Nature'},
  {value: 'Nightlife', label: '🌃 Nightlife'},
]

const CreateTrip = () => {
  const navigate = useNavigate()

  const [destination, setDestination] = useState('')
  const [durationDays, setDurationDays] = useState('')
  const [budgetTier, setBudgetTier] = useState('')
  const [interests, setInterests] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const onSubmitForm = async event => {
    event.preventDefault()

    try {
      setIsGenerating(true)

      const jwtToken = localStorage.getItem('jwtToken')

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/trips/generate`,
        {
          destination,
          durationDays: Number(durationDays),
          budgetTier,
          interests,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      setTimeout(() => {
        setIsGenerating(false)
        navigate(`/trip/${response.data._id}`)
      }, 2500)
    } catch (error) {
      console.log(error)
      setIsGenerating(false)
      alert('Failed to create trip')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">
      <form
        className="bg-white shadow-xl rounded-xl p-10 w-[500px] flex flex-col gap-5"
        onSubmit={onSubmitForm}
      >
        <div>
          <h1 className="text-3xl font-bold text-center text-slate-800">
            ✈️ AI Travel Planner
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Generate AI-powered personalized itineraries
          </p>
        </div>

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          min="1"
          placeholder="Number of Days"
          value={durationDays}
          onChange={e => setDurationDays(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={budgetTier}
          onChange={e => setBudgetTier(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Budget</option>
          <option value="Low">Low Budget</option>
          <option value="Medium">Medium Budget</option>
          <option value="High">High Budget</option>
        </select>

        <div>
          <p className="font-semibold mb-2 text-slate-700">
            Select Interests
          </p>

          <Select
            isMulti
            options={interestOptions}
            placeholder="Choose your interests..."
            onChange={selected =>
              setInterests(selected.map(each => each.value))
            }
          />
        </div>

        <button
          type="submit"
          disabled={
            !destination ||
            !durationDays ||
            !budgetTier ||
            interests.length === 0 ||
            isGenerating
          }
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg p-3 font-semibold transition"
        >
          {isGenerating
            ? '🧠 AI is generating your trip...'
            : '✨ Generate Trip'}
        </button>

        {isGenerating && (
          <div className="bg-blue-50 p-5 rounded-xl mt-2">
            <p className="text-center text-blue-700 font-semibold">
              🤖 AI is analyzing your preferences...
            </p>

            <p className="text-center text-gray-500 mt-2">
              🗺️ Creating day-wise itinerary...
            </p>

            <p className="text-center text-gray-500">
              🏨 Finding hotels...
            </p>

            <p className="text-center text-gray-500">
              💰 Estimating budget...
            </p>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateTrip