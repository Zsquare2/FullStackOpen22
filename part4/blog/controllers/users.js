const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { author: 1, likes: 1 })
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }
    if (!name || !username || !password ) {
        return response.status(400).json({
          error: 'must be name, username and password'
        })
    } else if (password.length < 3){
        return response.status(400).json({
          error: 'password must be more than 3 symbols'
        })
    } else if (username.length < 3){
        return response.status(400).json({
            error: 'username must be more than 3 symbols'
          })
        }  

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    
    response.status(201).json(savedUser)
})


module.exports = usersRouter