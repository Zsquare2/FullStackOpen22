const Notification = ({ message, notification }) => {
  if (message) {
    return(
      <div className="error">
      {message}
    </div>
    )
  }
  else if (notification) {
    return(
      <div className="notification">
      {notification}
    </div>
    )
  }
  return(null)
}

export default Notification