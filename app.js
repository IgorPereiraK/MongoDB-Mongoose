const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const path = require('path')
const linkRoute = require('./routes/linkRoute')

const mongoURL = 'mongodb://127.0.0.1:27017/newLinks'

mongoose.connect(mongoURL)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!')
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error)
  })

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.use('/', linkRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}`))