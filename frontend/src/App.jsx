import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import TripDetails from './pages/TripDetails'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trip/:id"
          element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App