const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Connect to chat Ap ${socket.id}`);
  socket.on('chat', (msg) => {
    socket.broadcast.emit('receiveMsg', msg);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
