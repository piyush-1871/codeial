module.exports.chatSockets = function (socketServer) {
    const { Server } = require('socket.io');
    const io = new Server(socketServer,{
      cors : {
        origin : "http://localhost:8000"
      }
    });
  
    io.on('connection', (socket) => {
      console.log('new connection recieved', socket.id);
  
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  
      socket.on('join_room', (data) => {
        console.log('joining requset recieve', data);
  
        socket.join(data.chat_room);
  
        io.in(data.chat_room).emit('user_joined', data);
      });
  
      socket.on('send_message', (data) => {
        console.log('joining request recieve', data);
        io.in(data.chat_room).emit('recieved_message', data);
      });
    });
  };