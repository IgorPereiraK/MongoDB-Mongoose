const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

// Aqui é onde fica a url do seu banco para ter uma conecção.
const mongoURL = 'mongodb://127.0.0.1:27017/newLinks'

// Aqui é onde vc criar seu Schema do jeito que vc precisa.
const linkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    click: { type: Number, default: 0 }
})

// Desse jeito vc cria o model do seu Schema que vc fez acima.
const Link = mongoose.model('Link', linkSchema)

// Aqui é onde vc colocar as informações que vc quer colocar no seu banco de dados, veja que está no modelo do seu Schema.
let link = new Link({
    title:"progbr",
    description: "Link para o Twitter",
    url: "https://twitter.com/progbr",
})

// Esse código abaixo é para salvar os dados no banco de dados.
link.save().then(doc => {
    console.log(doc)
}).catch(error => {
    console.log(error)
})

// Aqui abaixo é sua conecção com o mongoose, ou seja conecção com seu banco de dados.
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!')

    app.get('/:title', async (req, res) => {

      let titles = req.params.title
      try {
        let doc = await Link.findOne({ title:titles })
        console.log(doc)
        res.redirect(doc.url)

      } catch (error) {
        res.send(error)
      }
    })
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error)
  })



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))