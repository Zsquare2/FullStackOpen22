import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import logingService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await logingService.login({ username, password})

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
    console.log("title", newBlogTitle)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
    console.log("author", newBlogAuthor)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
    console.log("url", newBlogUrl)
  }


  const addBlog = async (event) => {
  event.preventDefault()

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
try{
    const response = await blogService.create(blogObject)
    setNotificationMessage( `a new blog ${response.title} by ${response.author} created` )
    setTimeout(() => {
      setNotificationMessage(null)
    },5000)
  }
    catch(exception){
      setErrorMessage( exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs ))
  }


  const createForm = () => (
    <form onSubmit={addBlog}>
      <p>
      title:
      <input
        value={newBlogTitle}
        onChange={handleBlogTitleChange}
      /><br></br>
      author:
      <input
        value={newBlogAuthor}
        onChange={handleBlogAuthorChange}
      /><br></br>
      url
      <input
        value={newBlogUrl}
        onChange={handleBlogUrlChange}
      /><br></br>
      </p>
      <button type="submit">create</button>
    </form>  
  )
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} notification={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
            type="text" 
            name="Username" 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
            type="text" 
            name="Password" 
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type='submit'>login</button>
          </div>

        </form>
      </div>
    )
    }

    return(
      <div>
        <div>
          <p>
            {user.name} logged-in
          </p>
          <Notification message={errorMessage} notification={notificationMessage} />
          <form onSubmit={handleLogout} >
              <button>logout</button>
          </form>
        </div>
        <h2>create new</h2>
        {createForm()}
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}

export default App
