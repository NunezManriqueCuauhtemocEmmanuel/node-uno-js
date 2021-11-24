let GameActionHandler = require('../GameActionHandler.js');
let UNOClient = require('./UNOClient.js');
let Message = require('../Message.js');

/**
 * Used by GameService to handle user login action
 * @type {module.LoginActionHandler}
 */
module.exports = class LoginActionHandler extends GameActionHandler {
    constructor(gameService){
        super(gameService);
    }
    handleAction(data){

        //TODO: Allow to create new clients only if game has not started yet.
        //  do not limit by number, only by maximum allowed clients [2-4]

        let cr = this.getGameService().getClientRepository();

        //Check if game has not started yet
        if(cr.findByReady(false) || cr.count() < 2){

            let client = cr.findByName(data.client.name);
            if(!client){
            
                //Create new client
                let cl = new UNOClient(data.client.name);
                cl.setSocketId(data.socketId);
                client = cr.insert(cl);
            
            }
        }else{
            this.getGameService().getMessageRepository().insert(new Message('error', 'Game has already started', data.socketId));
        }
    }
};