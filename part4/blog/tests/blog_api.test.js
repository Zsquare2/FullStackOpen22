const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

let token = ''
beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }

  const response = await api
  .post('/api/login')
  .send({ username: 'tester', password: 'password' })
  
  token = response.body.token
})


describe('Getting notes', () => {
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
})

describe('adding blog', () => {
  test('property of the blog posts is named "id" not "_id"', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
    });
  })

  test('401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
      title: "TESTS TITLE",
      author: "TESTS AUTHOR",
      url: "TESTS URL",
      likes: "69",
    }
    const noToken = null
    await api 
      .post('/api/blogs')
      .set('Authorization', `Bearer ${noToken}`)
      .send(newBlog)
      .expect(401)
  }, 10000)

  test('blog can be added', async () => {
    const newBlog = {
      title: "TESTS TITLE",
      author: "TESTS AUTHOR",
      url: "TESTS URL",
      likes: "69",
    }
    await api 
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  }, 10000)

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
      .set('Authorization', `Bearer ${token}`)
      .send(missingDataBlog)
      .expect(400)
  })
})

describe('dletion of a blog', () => {
  test('succeeds with code 204 if id is valid', async () => {
    const blogsAtStart =  await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
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

    const blog = { likes: blogToUpdate.likes + 5 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const updateBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updateBlog.likes).toBe(blogToUpdate.likes + 5)
  })
})

describe('Creating user', () => {
  test('Dont add user, when no username', async () => {
  const passwordHash = await bcrypt.hash('password2', 10)
  const user = new User({ username: '', name: 'tester to', passwordHash })
  const usersAtStart = await helper.usersInDb()

  const result = await api
    .post('/api/users')
    .send({ user })
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain("must be name, username and password")
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Dont add user when passwor shorter than 3 symbls', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const result = await api
      .post('/api/users')
      .send({ username: 'Username', name: 'Name', password: '12' })
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
      expect(result.body.error).toContain("password must be more than 3 symbols")
      
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})


afterAll(() => {
  mongoose.connection.close()
})