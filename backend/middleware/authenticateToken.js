const jwt = require('jsonwebtoken')

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({
      message: 'Token missing',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    request.user = decoded

    next()
  } catch (error) {
    return response.status(401).json({
      message: 'Invalid token',
    })
  }
}

module.exports = authenticateToken