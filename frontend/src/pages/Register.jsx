import {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitForm = async event => {
    event.preventDefault()

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        },
      )

      alert('Registration Successful')

      navigate('/login', {replace: true})
    } catch (error) {
      alert(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <form
        className="bg-white shadow-xl rounded-xl p-10 w-[420px] flex flex-col gap-4"
        onSubmit={onSubmitForm}
      >
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-center text-slate-800">
            AI Travel Planner
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Create your account
          </p>
        </div>

        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg p-3 font-semibold"
        >
          Register
        </button>
        <p className="text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register