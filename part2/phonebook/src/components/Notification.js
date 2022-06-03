import React from "react"

const Notification = ({ message, error }) => {
  if (message) {
    return(
      <div className="notification">
      {message}
    </div>
    )
  }
  else if (error) {
    return(
      <div className="error">
      {error}
    </div>
    )
  }
  
  return(null)
}

export default Notification