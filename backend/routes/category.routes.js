const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/category.controller')

router.post('/category', categoryController.createCategory)
router.get('/categories', categoryController.getCategories)
router.get('/category/:id', categoryController.getOneCategory)
router.put('/category/:id', categoryController.updateCategory)
router.delete('/category/:id', categoryController.deleteCategory)

module.exports = router