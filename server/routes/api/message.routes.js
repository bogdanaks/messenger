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

router.get('/getLastMsg/:chatIds', async (req, res) => {
    const chatIds = req.params.chatIds.split(',')
    function getUnique(arr, comp) {
        const unique =  arr.map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => arr[e]).map(e => arr[e])
        return unique
    }
    try {
        const msgs = await Messages.find({ 'chatId': { $in: chatIds } }).sort({createdAt: -1})
        return res.json(getUnique(msgs, 'chatId'))
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
            text: req.body.text
        })

        await newMsg.save().then(msg => res.send(msg))
    } catch(err) {
        res.status(400).send(err)
    }
})


module.exports = router