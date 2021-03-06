const { Router } = require('express')
const router = Router()

// Import Users Model
const Users = require('../../models/Users')

// Import Chats Model
const Chats = require('../../models/Chats')

// Import Messages Model
const Messages = require('../../models/Messages')

router.get('/getChats/:userId', async (req, res) => {
    function getUnique(arr, comp) {
        const unique =  arr.map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => arr[e]).map(e => arr[e])
        return unique
    }
    try {
        const user = await Users.findOne({userId: req.params.userId})
        const chats = await Chats.find({ chatId: { "$in" : user.inChats} })
        const msgs = await Messages.find({ 'chatId': { $in: user.inChats } }).sort({createdAt: -1})
        if(!msgs) return res.status(400).send('Messages is not found')
        res.send({chats: chats, lastMsgs: getUnique(msgs, 'chatId')})
    } catch(err) {
        res.status(400).send('Unknown error')
    }
})

router.post('/login', async (req, res) => {
    try {
        // Checking if login exists
        const user = await Users.findOne({name: req.body.name})
        if(!user) return res.status(400).send('Login is not found')

        // Check password
        let validPassword
        if(req.body.password === user.password) validPassword = true
        if(!validPassword) return res.status(400).send('Invalid password')

        res.send({userId: user.userId, name: user.name})
    } catch(err) {
        res.status(400).send(err)
    }
})


router.post('/register', async (req, res) => {
    // Checking if user is already in the db
    const loginExist = await Users.findOne({name: req.body.name})
    if(loginExist) return res.status(400).send('Login already exists')

    // Add new user in database
    const newUser = new Users({
        userId: req.body.userId,
        name: req.body.name,
        password: req.body.password
    })
    try {
        await newUser.save()
        res.send({userId: newUser.userId, name: newUser.name})
    } catch(err) {
        res.status(400).send("Final error: "+ err)
    }
})

module.exports = router