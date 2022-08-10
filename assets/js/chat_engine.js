class ChatEngine {
    constructor(chatBoxId, userEmail) {
      this.chatBoxId = $(`#${chatBoxId}`);
      this.userEmail = userEmail;
  
      this.socket = io.connect('http://localhost:5000');
  
      if (userEmail) {
        this.chatBoxHandler();
      }
    }
  
    chatBoxHandler() {
      let self = this;
  
      this.socket.on('connect', () => {
        console.log('new connection established from client side');
  
        self.socket.emit('join_room', {
          user_email: self.userEmail,
          chat_room: 'shareboxroom',
        });
  
        self.socket.on('user_joined', (data) => {
          console.log('a user joined', data);
        });
      });
  
      let sendBtn = $('.send-button');
  
      sendBtn.click(() => {
        let msg = $('#message-box').val();
        document.getElementById('message-box').value = '';
        if (msg != '') {
          self.socket.emit('send_message', {
            message: msg,
            user_email: self.userEmail,
            chat_room: 'shareboxroom',
          });
        }
      });
  
      self.socket.on('recieved_message', (data) => {
        console.log('a user joined', data);
        let messageType = 'user-2';
  
        if (data.user_email == self.userEmail) {
          messageType = 'user-1';
        }
  
        let p = $('<p></p>').append(data.message);
        console.log(p);
        $(p).addClass(messageType);
  
        $('.message').append(p);
      });
    }
  }