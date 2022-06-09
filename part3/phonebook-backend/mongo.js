const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('node mongo.js yourpassword')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]
const url = `mongodb+srv://ponas:${password}@cluster0.08mquuw.mongodb.net/phonebookAPP?retryWrites=true&w=majority`

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', peopleSchema)

if (process.argv.length === 3) {
  mongoose.connect(url)
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(people => {
      console.log(people.name, people.number)
    })
    process.exit(1)
  })
}

if (3 < process.argv.length  && process.argv.length < 6){
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: newName,
      number: newNumber,
    })

    return person.save()
  })
  .then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))}