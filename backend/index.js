const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./auth/auth-router')
const stockRouter = require('./chart/chart-router')
const cors = require('cors')

mongoose.connect('mongodb+srv://lhn15:Anhminhbin2@cluster0.x2ow1gg.mongodb.net/Stock-Prediction?retryWrites=true&w=majority', err => {
  if(err){
    return console.log('Err connecting DB', err)
  }

  console.log('Connect DB successfully!')
})

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/stock', stockRouter)

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