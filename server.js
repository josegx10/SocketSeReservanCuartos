const express = require('express');
var app = express();

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});


app.get('/', function (req, res) { //localhost:3000/ --> Hello Word
    res.send('Hello World!');
})

io.on('connection', (socket)  =>   {
    const idHandShake = socket.id;

    const {nombre} = socket.handshake.query;

    socket.join(nombre);

    console.log(`Hola dispositivo: ${idHandShake} se unio ${nombre}`);

    socket.on('event', (res) => {
        const data = res
        console.log(res)
        socket.to(nombre).emit('event', data)
    })
})

server.listen(process.env.PORT || 5000, () => {
    console.log('Socket listo y escuchando por el puerto: 5000')
})