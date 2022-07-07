const mongoose = require("mongoose")
const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {type : Number, default : 0}
  })


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports = mongoose.model('Blog', blogSchema)
  


