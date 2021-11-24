let UNOClient = require('./UNOClient.js');

/**
 * Layer over UNOClient to serve data back to clients.
 * @type {module.PublicUNOClient}
 */
module.exports = class PublicUNOClient {
    constructor(unoClient) {
        this.name = unoClient.getName();
        this.ready = unoClient.getReady();
        this.turn = unoClient.getTurn();
        this.cardsCount = unoClient.getCardsCount();
        this.hasWon = unoClient.getHasWon();
        this.score = unoClient.getScore();
        this.takeOrLeave = unoClient.getTakeOrLeave();        
    }
};