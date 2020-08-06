const { Router } = require('express')
const router = Router()

// Import Chat Model
const Users = require('../../models/Users')

router.post('/create', async (req, res) => {
    const newUser = new Users({
        userId: req.body.id,
        name: req.body.name,
        password: req.body.password,
    })
    try {
        await newUser.save().then(chat => res.json(chat))
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router