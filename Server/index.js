const io = require('socket.io')(3000, {
  cors: {
    // origin: 'http://localhost:5173',
    origin: 'https://delightful-heliotrope-c66640.netlify.app',
  },
});

io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    socket.emit('receiveMsg', msg);
    if (msg.id) {
      socket.to(msg.id).emit('receiveMsg', msg);
    } else if (msg.roomNo) {
      socket.to(msg.roomNo).emit('receiveMsg', msg);
    } else {
      socket.broadcast.emit('receiveMsg', msg);
    }
  });
  socket.on('Join', (roomNo) => {
    socket.join(roomNo);
  });
});
