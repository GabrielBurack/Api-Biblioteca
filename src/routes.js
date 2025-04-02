const express = require('express')
const livrosController = require('./controllers/livros-controller')
const userController = require('./controllers/user-controller')
const localController = require('./controllers/local-controller')

const router = express.Router()


router.post('/bib/livro', livrosController.save)
router.get('/bib/livro', livrosController.show)
router.get('/bib/livro/:id', livrosController.showById)
router.put('/bib/livro/:id', livrosController.update)
router.delete('/bib/livro/:id', livrosController.delete)

router.post('/bib/user', userController.save)
router.get('/bib/user', userController.show)
router.get('/bib/user/:id', userController.showById)
router.put('/bib/user/:id' , userController.update)
router.delete('/bib/user/:id', userController.delete)

router.get('/bib/locar', localController.show)
router.post('/bib/locar', localController.save)


module.exports = router

