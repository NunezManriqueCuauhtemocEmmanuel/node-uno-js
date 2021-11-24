let GameRulesModel = require('./GameRulesModel.js');
let UNOClient = require('./UNOClient.js');
let PublicCard = require('./PublicCard.js');
/**
 * Layer over GameRulesModel to serve data back to clients.
 * @type {module.PublicGameRulesModel}
 */
module.exports = class PublicGameRulesModel {
    constructor(client, gameRulesModel) {

        this.winner = false;
        this.ready = true;

        let hasWinner = gameRulesModel.clientRepository.findByHasWon(true);
        let nonReady = gameRulesModel.clientRepository.findByReady(false);

        if(hasWinner){
            this.winner = hasWinner.getName();
        }
        if(nonReady){        
            this.ready = false;
        }

        this.events = gameRulesModel.getEvents();

        this.cards = [];
        this.getPublicCards(client, gameRulesModel);
    }
    getPublicCards(client, gameRulesModel){     
        let cards = gameRulesModel.getCardRepository().findAll();
        for(let i=0; i<cards.length; i++){
            this.cards.push(new PublicCard(client, cards[i]));
        }       
    }
};