const { Router } = require('express')
const router = Router()

// Import Chat Model
const Chats = require('../../models/Chats')
// Import User Model
const Users = require('../../models/Users')

router.get('/', async (req, res) => {
    // console.log('Test')
})
router.get('/:chatId', async (req, res) => {
    try {
        await Chats.find({chatId: req.params.chatId}, (err, items) => {
            if(err) return res.status(404).send(err)
            return res.send(items)
        })
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/create', async (req, res) => {
    try {
        const user = await Users.findOne({userId: req.body.userId})
        const newChat = new Chats({
            chatId: req.body.chatId,
            users: user
        })

        await user.inChats.push(req.body.chatId)
        user.save()


        await newChat.save().then(chat => res.json(chat))
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router