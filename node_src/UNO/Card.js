
module.exports = class Card{
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.owner = "draw";
        this.moveId = null;
        this.nextMoveValid = false;
    }
    getId(){
        return this.id;
    }
    getType(){
        return this.type;
    }
    setType(type){
        this.type = type;
        return this;
    }    
    getColor(){
        return this.type.charAt(0);
    }
    getNumber(){
        return this.type.charAt(1);
    }    
    setOwner(owner){
        this.owner = owner;
        return this;
    }
    getOwner(){
        return this.owner;
    }    
    setMoveId(moveId){
        this.moveId = moveId;
        return this;
    }
    getMoveId(){
        return this.moveId;
    }    
    setNextMoveValid(nextMoveValid){
        this.nextMoveValid = nextMoveValid;
        return this;
    }
    getNextMoveValid(){
        return this.nextMoveValid;
    }     
    // static setArrayOwner(cards, owner){
    //     if(Array.isArray(cards)){
    //         cards.forEach(element => {
    //             if(element instanceof Card){
    //                 element.setOwner(owner);
    //             }
    //         });
    //     }
    // } 
    static setArrayNextMoveValid(cards, nextMoveValid){
        if(Array.isArray(cards)){
            cards.forEach(element => {
                if(element instanceof Card){
                    element.setNextMoveValid(nextMoveValid);
                }
            });
        }
    }        
};