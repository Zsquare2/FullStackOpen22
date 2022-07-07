const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs) 
  })
  
blogsRouter.post('/', async (request, response) => {
    body = request.body
    if (!body.url || !body.title) {
      return response.status(400).json({
        error: 'Bad request'
      })
    }

    const blog = await new Blog(request.body).save()
    response.status(201).json(blog)

  })

  module.exports = blogsRouter