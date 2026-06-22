const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (request, response) => {
  try {
    const {name, email, password} = request.body

    const user = await User.findOne({email})

    if (user) {
      return response.status(400).json({
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    response.status(201).json({
      message: 'User registered successfully',
    })
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
}

const login = async (request, response) => {
  try {
    const {email, password} = request.body

    const user = await User.findOne({email})

    if (!user) {
      return response.status(400).json({
        message: 'Invalid email',
      })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      return response.status(400).json({
        message: 'Invalid password',
      })
    }

    const payload = {
      id: user._id,
    }

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET)

    response.status(200).json({
      jwtToken,
    })
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  register,
  login,
}