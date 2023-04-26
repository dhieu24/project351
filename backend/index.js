const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./auth/auth-router')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/stock-app', err => {
  if(err){
    return console.log('Err connecting DB', err)
  }

  console.log('Connect DB successfully!')
})

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)

const port = 8000

app.get('/a', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('*', (req, res) => {
  res.send({
    message: '404 not found!'
  })
})