/**
 * Base Client class. Uno game exstends this to add game specific attributes
 * @type {module.Client}
 */
module.exports = class Client{
    constructor(name){
        this.name = name;
        this.code = Math.random();
        this.ready = false;
        this.socketId = null;
    }
    setName(name){
        this.name = name;
        return this;
    }
    getName(){
        return this.name;
    }
    setCode(code){
        this.code = code;
        return this;
    }
    getCode(){
        return this.code;
    }
    setReady(ready){
        this.ready = ready;
        return this;
    }
    getReady(){
        return this.ready;
    }
    setSocketId(socketId){
        this.socketId = socketId;
        return this;
    }
    getSocketId(){
        return this.socketId;
    }

};