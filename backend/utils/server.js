const express = require('express')
const {Server} = require('socket.io')
const http = require('node:http')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('dist'))
const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin : '*',
        methods : ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    // Handle user joining a room
    socket.on('join_room', (room) => {
        if (room && room.code) {
            socket.join(room.code);

        } else {

            console.error('Invalid room code');
        }
    });

    // Handle sending a message to a room
    socket.on('send_message', (info) => {
        if (info && info.code && info.message) {
            
            socket.to(info.code).emit('update_message', info.message);
        } else {
            console.error('Invalid message or room code');
        }
    });


    socket.on('disconnect', () => {
    });
});



module.exports = {
    io, server, app
}