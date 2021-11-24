let Card = require('./Card.js');

module.exports = class PublicCard{
    constructor(client, card) {
        this.id = card.getId();
        this.type = null;
        this.owner = card.getOwner();
        this.moveId = card.getMoveId();
        this.nextMoveValid = card.getNextMoveValid();

        if(this.owner === "dsc" || this.owner === client.getName()){
            this.type = card.getType();
        }
        this.transform = {
            x:0,
            y:0,
            z:300,
            angle:0,
            scale:1,
            d:0        
        };
    }
};