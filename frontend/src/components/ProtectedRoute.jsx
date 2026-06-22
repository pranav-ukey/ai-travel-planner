import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const jwtToken = localStorage.getItem('jwtToken')

  if (!jwtToken) {
    return <Navigate to="/login" replace/>
  }

  return children
}

export default ProtectedRoute
