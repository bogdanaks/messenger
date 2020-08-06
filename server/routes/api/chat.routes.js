const { Router } = require('express')
const router = Router()

// Import Chat Model
const Chats = require('../../models/Chats')

router.get('/', async (req, res) => {
    // console.log('Test')
})
router.get('/chats/:chatId', async (req, res) => {
    console.log(req.params.chatId)
})

router.post('/create', async (req, res) => {
    const newChat = new Chats({
        chatId: req.body.id
    })
    try {
        await newChat.save().then(chat => res.json(chat))
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router