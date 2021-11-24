let UNOClient = require('./UNOClient.js');
let PublicUNOClient = require('./PublicUNOClient.js');

/**
 * Layer over ClientRepository to serve data back to clients.
 * @type {module.PublicClientsModel}
 */
module.exports = class PublicClientsModel {

    constructor(clientRepository) {
        this.clients = [];
        this._processClients(clientRepository.findAll());
    }
    getClients(){
        return this.clients;
    }
    _processClients(clientsArray){
        for(let i=0; i<clientsArray.length; i++){
            this._addClient(clientsArray[i]);
        }
    }
    _addClient(client){
        if(client instanceof UNOClient){
            this.clients.push(new PublicUNOClient(client));
        }
    }
};