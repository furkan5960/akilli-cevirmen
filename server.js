const express = require('express');
const app = express();
const http = require('http').Server(app);
// CORS ayarı ile telefonların erişim engelini kaldırıyoruz
const io = require('socket.io')(http, { cors: { origin: "*" } }); 
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('🟢 Yeni bir cihaz bağlandı! ID:', socket.id);

    socket.on('offer', (offer) => {
        console.log('📞 Biri arama başlattı (Sinyal karşıya iletiliyor...)');
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        console.log('✅ Karşı cihaz aramayı kabul etti (Cevap iletiliyor...)');
        socket.broadcast.emit('answer', answer);
    });

    socket.on('ice-candidate', (candidate) => {
        socket.broadcast.emit('ice-candidate', candidate);
    });

    socket.on('altyazi', (data) => {
        socket.broadcast.emit('altyazi', data);
    });

    socket.on('disconnect', () => {
        console.log('🔴 Bir cihaz bağlantıdan koptu.');
    });
});

// Render'ın kapıyı rahat bulması için '0.0.0.0' ekledik
const PORT = process.env.PORT || 10000;
http.listen(PORT, '0.0.0.0', () => { 
    console.log(`🚀 Sunucu başarıyla çalışıyor. Port: ${PORT}`); 
});
