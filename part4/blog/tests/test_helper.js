const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        _id: '62cff5bc1691a0db41694ecc',
        username: 'tester',
        name: 'test',
        passwordHash: '$2b$10$H6cBDoVxdZFUaFbaPFT7SO7YFpThSJKRdU7iduWyFDiGCLEQq9zWe'
    },
    {   _id: '62cffa2a697b9547c6747b82',
        username: 'tester2',
        name: 'test2',
        passwordHash: '$2b$10$bacqbERNDZweAJhfUwNLz.iaCrZNi8Aqz2/IBxW3YULga8yKqcmu.'
    }
]

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "tester",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: '62cff5bc1691a0db41694ecc',
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  

module.exports = {blogsInDb, initialBlogs, initialUsers,usersInDb}