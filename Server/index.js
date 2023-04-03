const io = require('socket.io')(3000, {
  cors: {
    // origin: 'http://localhost:5173',
    origin: 'https://delightful-heliotrope-c66640.netlify.app',
  },
});

io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    if (msg.id) {
      console.log(1);
      socket.to(msg.id).emit('receiveMsg', msg);
    } else if (msg.roomNo) {
      console.log(2);
      socket.to(msg.roomNo).emit('receiveMsg', msg);
      socket.emit('receiveMsg', msg);
    } else {
      console.log(3);
      socket.broadcast.emit('receiveMsg', msg);
      socket.emit('receiveMsg', msg);
    }
  });
  socket.on('Join', (roomNo) => {
    socket.join(roomNo);
  });
});
