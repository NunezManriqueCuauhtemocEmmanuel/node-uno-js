let Card = require('./Card.js');

module.exports = class CardRepository{
    constructor() {
        this.cards = [];
    }
    insert(card){
        if(card instanceof Card){
            this.cards.push(card);
        }
    }
    clear(){
        this.cards = [];
    }
    findById(id){
        return this.cards.find(function(elem){return elem.getId() === id;});
    }
    findByOwner(owner){
        return this.cards.find(function(elem){return elem.getOwner() === owner;});
    }    
    findAll(){
        return this.cards;
    }
    // findFirstByOwner(owner){        
    //     return this.cards.find(function(elem){return elem.getOwner === owner;});
    // }
};