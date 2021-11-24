let Message = require('./Message.js');

module.exports = class MessageRepository{
    constructor(){
        this.messages = [];
    }
    clear(){
        this.messages = [];
    }    
    insert(message){
        if(message instanceof Message){
            this.messages.push(message);
        }
    }
    findAll(){
        return this.messages;
    }
    findByClient(client){
        let socketId = client.getSocketId();
        return this.messages.find(function(elem){return elem.socketId === socketId;});
    }
};