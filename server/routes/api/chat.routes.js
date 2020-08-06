const { Router } = require('express')
const router = Router()

// Import Chat Model
const Chat = require('../../models/Chat')

router.get('/', async (req, res) => {
    console.log('Test')
})
router.get('/chats/:chatId', async (req, res) => {
    console.log(req.params.chatId)
})

module.exports = router