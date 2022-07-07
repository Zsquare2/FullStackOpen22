const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
//   console.log("what blogs", helper.initialBlogs)

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six notes', async () => {
  const response = await api.get('/api/blogs')
  console.log("TO JSON!!!!", response.toJSON())

  expect(response.body).toHaveLength(6)
})

test('property of the blog posts is named "id" not ', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  });
})

test('blog can be added', async () => {
  const newBlog = {
    title: "TESTS TITLE",
    author: "TESTS AUTHOR",
    url: "TESTS URL",
    likes: "69"
  }
  const initialBlogs = await helper.blogsInDb() 
  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

})



afterAll(() => {
  mongoose.connection.close()
})