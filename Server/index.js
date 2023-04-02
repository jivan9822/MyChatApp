const io = require('socket.io')(3000, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    socket.broadcast.emit('receiveMsg', msg);
  });
});
