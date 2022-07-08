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

describe('dletion of a blog', () => {
  test('succeeds with code 204 if id is valid', async () => {
    const blogsAtStart =  await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const id = blogsAtEnd.map(r => r.id)
    expect(id).not.toContain(blogToDelete.id)
  },10000) 
})


describe('updating information ', () => {
  test('updating likes if code 201', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blog = {
      likes: blogToUpdate.likes + 5
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const updateBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updateBlog.likes).toBe(blogToUpdate.likes + 5)
  })
})

afterAll(() => {
  mongoose.connection.close()
})