let GameActionHandler = require('../GameActionHandler.js');
let UNOClient = require('./UNOClient.js');

/**
 * Used by GameService to handle user ready state action
 * @type {module.BeginActionHandler}
 */
module.exports = class BeginActionHandler extends GameActionHandler{
    constructor(gameService){
        super(gameService);
    }
    handleAction(data){
        let client = this.getGameService().getClientRepository().findByName(data.client.name);
        if(client instanceof UNOClient && !client.getReady()){
            client.setReady(true);
        }
        if(!this.getGameService().getClientRepository().findByReady(false)
            &&  this.getGameService().getClientRepository().count() > 1
        ){
            this.getGameService().getGameRulesModel().deal();
        }
        return true;
    }
};