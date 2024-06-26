const express = require('express')
const router = express.Router()

const linkController = require('../controllers/linkController')

router.get('/', linkController.allLinks)

router.get('/add', (req, res) => res.render('index', { error: false, body:{} }))

router.get('/:title', linkController.redirect)

router.get('/edit/:id', linkController.loadLink)

router.post('/', express.urlencoded({ extended: true }), linkController.addLink)

router.post('/edit/:id', express.urlencoded({ extended: true }), linkController.editLink )

router.delete('/:id', linkController.deleteLinks)

router.delete('/', express.json(), linkController.deleteLinks)


module.exports = router