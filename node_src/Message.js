module.exports = class Message{
    constructor(type, message, socketId){
        this.type = type;
        this.socketId = socketId;
        this.message = message;
    }
};