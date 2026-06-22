import {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitForm = async event => {
    event.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        },
      )

      localStorage.setItem('jwtToken', response.data.jwtToken)

      navigate('/', {replace: true})
    } catch (error) {
      alert('Invalid Credentials')
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
            Login to continue
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg p-3 font-semibold">
          Login
        </button>
        <p className="text-center text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login