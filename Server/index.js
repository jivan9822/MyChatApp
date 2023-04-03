const io = require('socket.io')(3000, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    if (msg.id) {
      console.log(msg.id);
      socket.to(msg.id).emit('receiveMsg', msg);
    } else if (msg.roomNo) {
      socket.to(msg.roomNo).emit('receiveMsg', msg);
    } else {
      socket.broadcast.emit('receiveMsg', msg);
    }
  });
  socket.on('Join', (roomNo) => {
    console.log(roomNo);
    socket.join(roomNo);
  });
});
