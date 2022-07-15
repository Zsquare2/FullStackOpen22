const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  })
 

blogsRouter.post('/', userExtractor, async (request, response) => {
    body = request.body

    if (!body.url || !body.title) {
      return response.status(400).json({
        error: 'Bad request'
      })
    }

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  })


blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete === null){
    response.status(401).json({ error: 'no blog found'}).end()
  } else {
    const decodedTokenUserId = request.user.id

    if (!decodedTokenUserId) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else if ( blogToDelete.user.toString() === decodedTokenUserId.toString() ) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else response.status(401).json({ error: 'blog can be deleted only by the user who added the blog'})
  }
})


blogsRouter.put('/:id', async (request, response) => {
  body = request.body

  newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog)
  response.status(201).json(newBlog)
})


module.exports = blogsRouter