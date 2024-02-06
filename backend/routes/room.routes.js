const Router = require('express')
const router = new Router()
const roomController = require('../controllers/room.controller')

router.post('/room', roomController.createRoom)
router.get('/rooms', roomController.getRooms)
router.get('/rooms-reserves', roomController.getRoomsWithReserves)
router.post('/reserving/:id', roomController.createRoomReserve)
router.get('/room/:id', roomController.getOneRoom)
router.put('/room/:id', roomController.updateRoom)
router.delete('/room/:id', roomController.deleteRoom)

module.exports = router