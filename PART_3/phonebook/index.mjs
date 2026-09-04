import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// MongoDB Connection
const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://phonebook_user:password@phonebook.oe8giop.mongodb.net/?appName=Phonebook'

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err))

// Define Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Serve static files from dist folder
app.use(express.static('dist'))

// GET all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// GET specific person
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
})

// POST new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name) {
    return res.status(400).json({ error: 'name is required' })
  }

  if (!number) {
    return res.status(400).json({ error: 'number is required' })
  }

  const person = new Person({ name, number })

  person.save().then(savedPerson => {
    res.status(201).json(savedPerson)
  }).catch(err => {
    if (err.code === 11000) {
      res.status(409).json({ error: 'name must be unique' })
    } else {
      res.status(400).json({ error: err.message })
    }
  })
})

// DELETE person
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end()
  }).catch(err => {
    res.status(404).json({ error: 'Person not found' })
  })
})

app.get('/info', (req, res) => {
  Person.countDocuments({}).then(count => {
    const currentTime = new Date().toString()
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${currentTime}</p>
    `)
  })
})

// Serve index.html for all unmatched routes (SPA)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
