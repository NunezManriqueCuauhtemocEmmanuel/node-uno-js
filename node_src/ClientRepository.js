let Client = require('./Client.js');

/**
 * Client storage class
 * @type {module.ClientRepository}
 */
module.exports = class ClientRepository{
    constructor(){
        this.clients = [];
    }
    get(index){
        return this.clients[index];
    }
    findAll(){
        return this.clients;
    }
    findByName(name){
        return this.clients.find(function(elem){return elem.name === name;});
    }
    findBySocketId(socketId){
        return this.clients.find(function(elem){return elem.socketId === socketId;});
    }    
    findIndexByName(name){
        return this.clients.findIndex(function(elem){return elem.name === name;});
    }
    findByCode(code){
        return this.clients.find(function(elem){return elem.code === code;});
    }
    findByReady(ready){
        return this.clients.find(function(elem){return elem.ready === ready;});
    }
    findByHasWon(hasWon){
        return this.clients.find(function(elem){return elem.hasWon === hasWon;});
    }
    findNext(client){
        let index = this.findIndexByName(client.getName());
        return this.get((index + 1)%this.count());
    }
    findPrevious(client){
        let index = this.findIndexByName(client.getName());
        let prev = (index + this.count() - 1)%this.count();
        return this.get(prev);
    }
    count(){
        return this.clients.length;
    }
    insert(client){
        this.clients.push(client);
        return client;
    }
};