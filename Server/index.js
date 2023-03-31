const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    socket.broadcast.emit('receiveMsg', msg);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
