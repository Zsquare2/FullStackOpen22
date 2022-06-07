const { request, response, json } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

morgan.token('body',
    reqBody => {
        return JSON.stringify(reqBody.body)
    })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
response.send(`<p> Phonebook has info for ${persons.length} people </p>
    <p>${Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateRandomNumber= (min, max) =>{
    return Math.floor(Math.random() * (max - min) +min)
}


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

    const person = {
        id: generateRandomNumber(0, 100000),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'uknown endpoint'})
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})