require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', function getBody(req) {
  if (req.body) {
    return JSON.stringify(req.body)
  } else {
    return ''
  }
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/', (request, response) => {
  const reply =
    '<h1>Phonebook Backend</h1><br/><h3>Use the /api/persons endpoint to access the phonebook data.</h3>'
  response.send(reply)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then((count) => {
    console.log(count)
    const date = Date().toLocaleString()
    const reply =
      '<h2>Phonebook has info for '
      + count
      + ' people</h2><br/><h3>'
      + date
      + '</h3>'
    response.send(reply)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then((result) => {
      if (result) {
        response.json(result)
      } else {
        response.statusMessage = `Whoops, the person with ID ${id} doesnt exist in the phonebook.`
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        response.statusMessage = `Deleted record ${result.id} ${result.name} ${result.number}`
        response.status(204).end()
      } else {
        response.statusMessage = `Whoops, the person with ID ${id} doesnt exist in the phonebook.`
        response.status(404).end()
      }
    })
    .catch((e) => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id
  Person.findById(id)
    .then((result) => {
      if (!result) {
        response.statusMessage = `Entry with id ${id} not found`
        return response.status(404).end()
      }

      result.name = name
      result.number = number

      return result.save().then((updated) => {
        response.json(updated)
      })
    })
    .catch((e) => next(e))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  //   if (!body.name) {
  //     return response.status(400).json({error: "name missing"});
  //   }

  //   if (!body.number) {
  //     return response.status(400).json({error: "number missing"});
  //   }

  const newPerson = new Person({ name: body.name, number: body.number })

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((e) => next(e))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
