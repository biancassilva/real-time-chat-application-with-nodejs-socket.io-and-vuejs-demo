const express = require('express');
const app = express();

const server = app.listen(3001);

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('SEND_MESSAGE', function(data) {
    io.emit('MESSAGE', data);
  });
});
