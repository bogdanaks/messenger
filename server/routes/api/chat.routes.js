const { Router } = require('express')
const router = Router()

// Import Chat Model
const Chats = require('../../models/Chats')
// Import User Model
const Users = require('../../models/Users')
// Import Message Model
const Messages = require('../../models/Messages')

router.get('/getUserNamesIn/:chatId', async (req, res) => {
    try {
        await Chats.find({chatId: req.params.chatId}, (err, items) => {
            if(err) return res.status(404).send(err)

            let userNames = []
            items.forEach(( el ) => {
                el.users.forEach(el => {
                    userNames.push(el.name)
                })
            })
            return res.send(userNames)
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
        const newMsg = new Messages({
            chatId: req.body.chatId,
            userId: req.body.userId,
            userName: 'Bot',
            text: 'Chat created'
        })
        await newMsg.save()

        await user.inChats.push(req.body.chatId)
        user.save()

        await newChat.save().then(chat => res.send(chat))
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/enterchat', async (req, res) => {
    try {
        const user = await Users.findOne({userId: Number(req.body.userId)})
        user.inChats.push(req.body.chatId)
        await user.save()

        const chat = await Chats.findOne({chatId: req.body.chatId})
        chat.users.push(user)
        await chat.save().then(chat => res.send(chat))
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router