const { request, response, json } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/phonebook')



app.use(cors())

app.use(express.static('build'))

morgan.token('body',
    reqBody => {
        return JSON.stringify(reqBody.body)
    })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })


app.get('/api/persons', (request, response) => {
    Person.find({}).then(people =>{
        response.json(people)
    })
})


app.get('/api/info', (request, response) => {
response.send(`<p> Phonebook has info for ${persons.length} people </p>
    <p>${Date()}</p>`)
})


app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person){
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            respomse.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })

    } if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } 
    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing'})
    }


    const person = new Person({
        name: body.name,
        number: body.number,
    })
    console.log('personas', person)
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
      Person.findByIdAndUpdate(request.params.id, person)
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'uknown endpoint'})
}

app.use(unknownEndpoint)


const errorHandler =(request, respones, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: 'malformated id'})
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})