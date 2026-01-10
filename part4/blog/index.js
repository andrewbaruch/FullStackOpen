require('dotenv').config()
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')

const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(config.MONGODB_URI, { family: 4 })

app.use(express.json())
app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
