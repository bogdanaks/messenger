const { Router } = require('express')
const router = Router()

// Import Messages Model
const Messages = require('../../models/Messages')

router.get('/getMsgById/:chatId', async (req, res) => {
    try {
        await Messages.find({chatId: req.params.chatId}, (err, items) => {
            if(err) return res.status(404).send(err)
            return res.send(items)
        })
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/sendMessage', async (req, res) => {
    try {
        const newMsg = new Messages({
            chatId: req.body.chatId,
            userId: req.body.userId,
            userName: req.body.userName,
            text: req.body.text,
            date: req.body.date
        })

        await newMsg.save().then(msg => res.send(msg))
    } catch(err) {
        res.status(400).send(err)
    }
})


module.exports = router