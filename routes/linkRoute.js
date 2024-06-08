const express = require('express')
const router = express.Router()

const linkController = require('../controllers/linkController')

router.get('/', linkController.allLinks)

router.get('/add', (req, res) => res.render('index', { error: false, body:{} }))

router.get('/:title', linkController.redirect)  

router.post('/', express.urlencoded({ extended: true }), linkController.addLink)

router.delete('/:id', linkController.deleteLinks)

router.delete('/', express.json(), linkController.deleteLinks)


module.exports = router