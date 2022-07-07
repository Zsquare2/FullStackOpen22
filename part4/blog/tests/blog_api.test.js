const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')
  console.log("TO JSON!!!!", response.toJSON())

  expect(response.body).toHaveLength(2)
})

test('property of the blog posts is named "id"', async () => {
  const response = await api.get('/api/blogs')
  console.log("RESPONSE", response.body)

  response.body.forEach(blog => {
    console.log("BLOG ID", blog.id)
    expect(blog._id).toBeDefined()
  });
})


afterAll(() => {
  mongoose.connection.close()
})