const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')
const http = require('http')
const socketio = require('socket.io')
const socketMW = require('./socket')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || config.get('port')

app.use(cors())
app.use(express.json())

// Import Chat Model
const Chats = require('./models/Chats')

//socetio
let allClients = []
io.on('connection', (socket) => {
    console.log("Socket io connection")
    socketMW(socket, allClients)

    socket.on('disconnect', () => {
        function filterBysId(arr, sId) {
            arr.filter(function(item, i, arr) {
                if(item.sId === sId) {
                    allClients.splice(i, 1)
                    socket.to(item.chatId).emit('CHAT:SET_ONLINE', allClients)
                }
            })
        }
        filterBysId(allClients, socket.id)
        console.log('user disconnected')
    })
})

//routes
app.use('/api/chat', require('./routes/api/chat.routes'))
app.use('/api/user', require('./routes/api/user.routes'))
app.use('/api/message', require('./routes/api/message.routes'))

//start server
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {useNewUrlParser: true, useUnifiedTopology: true})
            .then((res) => console.log(`Mongo start success`))
            .catch((err) => console.log(`Mongo error: ${err}`))
        await server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    } catch (error) {
        console.log(`Server error: ${error}`)
        process.exit(1)
    }
}

start()