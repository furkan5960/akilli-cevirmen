const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('offer', (offer) => socket.broadcast.emit('offer', offer));
    socket.on('answer', (answer) => socket.broadcast.emit('answer', answer));
    socket.on('ice-candidate', (candidate) => socket.broadcast.emit('ice-candidate', candidate));
    socket.on('altyazi', (data) => socket.broadcast.emit('altyazi', data));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => { console.log(`Sunucu aktif: port ${PORT}`); });
