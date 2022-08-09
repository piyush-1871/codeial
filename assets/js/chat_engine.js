class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#$(chatBoxId)`);
        this.userEmail = userEmail;

        tis.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

        })
    }
}