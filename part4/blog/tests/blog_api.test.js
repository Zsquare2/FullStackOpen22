const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

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
  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

})

test('if likes property missing, default value to 0', async () => {
  const newBlog = new Blog({
    title: "TESTS no likes",
    author: "TESTS no likes",
    url: "TESTS likes",
  })
  
  await newBlog.save()
  const id = newBlog._id.toString()

  blogsAtEnd = await helper.blogsInDb()
  const checkBlog = blogsAtEnd.find(blog => blog.id === id)
  expect(checkBlog.likes).toBe(0)

})

test('if no title or url 400 Bad Request', async () => {
    const missingDataBlog = {
    author: "TESTS AUTHOR",
    likes: "69"
  }
  await api
    .post('/api/blogs')
    .send(missingDataBlog)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})