const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')
const http = require('http')
// const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
// const io = socketio(server)
const PORT = process.env.PORT || config.get('port')

app.use(cors())
app.use(express.json())

//routes
app.use('/api/chat', require('./routes/api/chat.routes'))
app.use('/api/user', require('./routes/api/user.routes'))
app.use('/api/message', require('./routes/api/message.routes'))

//start server
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {useNewUrlParser: true, useUnifiedTopology: true})
        await server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    } catch (error) {
        console.log(`Server error: ${error}`)
        process.exit(1)
    }
}

start()