const blogsRouter = require('express').Router()
// const { response, request } = require('../app')
const { findById, findByIdAndRemove } = require('../models/blog')
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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  console.log(request.params.id)
  response.status(204).end()
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