const { Router } = require('express')
const router = Router()

// Import Chat Model
const Chats = require('../../models/Chats')
// Import User Model
const Users = require('../../models/Users')
// Import Message Model
const Messages = require('../../models/Messages')

router.get('/getChat/:chatId', async (req, res) => {
    try {
        const chat = await Chats.findOne({ chatId: req.params.chatId })
        if(!chat) return res.status(400).send('Chat is not found')

        return res.send(chat)
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/create', async (req, res) => {
    try {
        const user = await Users.findOne({userId: req.body.userId})
        const newChat = new Chats({
            chatId: req.body.chatId,
            users: req.body.userId
        })
        await newChat.save()
        const newMsg = new Messages({
            chatId: req.body.chatId,
            userId: req.body.userId,
            userName: 'Bot',
            text: 'Chat created',
            date: req.body.date
        })
        await newMsg.save()

        await user.inChats.push(req.body.chatId)
        user.save()

        return res.send(newChat)
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
        chat.users.push(req.body.userId)
        await chat.save()

        return res.send(chat)
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router