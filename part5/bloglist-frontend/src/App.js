import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import logingService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

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

    // try {
      const user = await logingService.login({ username, password})

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } 
    // setErrorMessage('Wrong credentials')
    // setTimeout(() => {
    //   setErrorMessage(null)
    // }, 5000)
  // }

  const handleLogout = () => {
    console.log("tries to log out")
    window.localStorage.clear()
    setUser=''
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
          <form onClick={handleLogout} >
              <button>logout</button>
          </form>

        </div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}

export default App
