const { Router } = require('express')
const router = Router()

// Import Users Model
const Messages = require('../../models/Messages')

router.get('/getMsgById/:chatId', async (req, res) => {
    try {
        console.log(req.params.chatId)
        await Messages.find({chatId: req.params.chatId}, (err, items) => {
            if(err) return res.status(404).send(err)
            return res.send(items)
        })
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router