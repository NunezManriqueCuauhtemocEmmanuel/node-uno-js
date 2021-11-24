let ClientRepository = require('./UNOClientRepository.js');
let UNOClient = require('./UNOClient.js');
let Card = require('./Card.js');
let CardRepository = require('./CardRepository.js');

module.exports = class GameRulesModel{

    constructor(clientRepository) {
        this.cardTypes = [
            'r0','r1','r2','r3','r4','r5','r6','r7','r8','r9','rp','rn','rr',
            'g0','g1','g2','g3','g4','g5','g6','g7','g8','g9','gp','gn','gr',
            'b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','bp','bn','br',
            'y0','y1','y2','y3','y4','y5','y6','y7','y8','y9','yp','yn','yr',
            'kg','kc','kg','kc'
        ];        
        this.clientRepository = clientRepository;
        this.cardRepository = new CardRepository();

        this.drawDeck = [];
        this.discardDeck = [];
        this.direction = true;
        this.moveIndex = 0;
        this.events = [];

        this.init();
    }
    init(){
        this.shuffleDeck();
    }    
    shuffleDeck(){
        this.moveIndex = 0;
        let j, x, i;
        for (i = this.cardTypes.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.cardTypes[i];
            this.cardTypes[i] = this.cardTypes[j];
            this.cardTypes[j] = x;
        }   
        this.cardRepository.clear(); 
        this.drawDeck = [];    
        for(let i=0; i<this.cardTypes.length; i++){
            let card = new Card(i, this.cardTypes[i]);
            card.setMoveId(this.incrementMoveIndex());
            this.cardRepository.insert(card);
            this.drawDeck.push(card);
        }
    }
    reShuffleDeck(){
        let topCard = this.discardDeck.pop();
        for(let i=0; i<this.discardDeck.length; i++){
            if(this.discardDeck[i].getNumber() === 'g'){
                this.discardDeck[i].setType("kg");
            }
            if(this.discardDeck[i].getNumber() === 'c') {
                this.discardDeck[i].setType("kc");            
            }
            this.discardDeck[i].setOwner("draw");
            let move = Math.floor(Math.random() * 1000);
            this.discardDeck[i].setMoveId(move);
            this.drawDeck.push(this.discardDeck[i]);
            this.saveEvent(this.discardDeck[i], "draw");
        }
        this.discardDeck = [];
        this.discardDeck.push(topCard);
    }
    deal(){

        this.shuffleDeck();

        this.clearEvents();

        let i, k;
        let clients = this.clientRepository.findAll();
        for (k=0; k<clients.length; k++){
            clients[k].clearCards();
        }       
        for(i=0; i<7; i++){
            for (k=0; k<clients.length; k++){
                this.takeCard(clients[k]);
            }
        }
        this.discardDeck = [];
        while(true) {
            let card = this.drawDeck.shift();
            this.placeCard(card);
            if(card.getType() !== 'kg' && card.getType() !== 'kc') {
                break;
            }
        }
        this.begin();
    }
    begin(){
        //Set all client turns to false
        UNOClient.setArrayTurn(this.clientRepository.findAll(), false);
        UNOClient.setArrayHasWon(this.clientRepository.findAll(), false);
        
        //Should be randomized
        this.clientRepository.get(0).setTurn(true);

        this.validateNextMove();
    }
    getNextClient(unoClient){
        let unoClientNext;
        if(this.direction){
            unoClientNext = this.clientRepository.findNext(unoClient);
        }else{
            unoClientNext = this.clientRepository.findPrevious(unoClient);
        }
        if(unoClientNext instanceof UNOClient){
            return unoClientNext;
        }            
        return false;
    }
    cardCanBePlaced(card){
        let current = this.discardDeck.slice(-1)[0];
        if(typeof current === 'undefined')return false;

        //Check if card is allowed
        if(card.getNumber() === 'g'       //kg (rg,yg,bg,gg)
            || card.getNumber() === 'c'   //kc (rc,yc,bc,gc)
            || card.getColor() === current.getColor()
            || card.getNumber() === current.getNumber()){

                return true;
        }
        return false;
    }    
    finishTurn(unoClient, card){
        
        unoClient.setTakeOrLeave(false);  

        if(card instanceof Card){
            let unoClientNext = this.getNextClient(unoClient);
            if(unoClientNext instanceof UNOClient){
                if(card.getNumber() === 'g'){     //pick up 4
                    this.takeCard(unoClientNext);
                    this.takeCard(unoClientNext);
                }
                if(card.getNumber() === 'p' || card.getNumber() === 'g'){     //pick up 2
                    this.takeCard(unoClientNext);
                    this.takeCard(unoClientNext);
                }            
                if(card.getNumber() === 'n' || card.getNumber() === 'p' || card.getNumber() === 'g'){     //skip
                    unoClientNext = this.getNextClient(unoClientNext);
                }           
                if(card.getNumber() === 'r'){     //reverse direction
                    this.direction = !this.direction;
                    unoClientNext = this.getNextClient(unoClient);
                }                                  
                if(unoClientNext instanceof UNOClient){
                    UNOClient.setArrayTurn(this.clientRepository.findAll(), false);
                    unoClientNext.setTurn(true);
                }
                if(unoClient.getCardsCount() === 0){
                    UNOClient.setArrayTurn(this.clientRepository.findAll(), false);
                    UNOClient.setArrayHasWon(this.clientRepository.findAll(), false);                    
                    UNOClient.setArrayReady(this.clientRepository.findAll(), false);  

                    unoClient.setHasWon(true);                          
                    UNOClient.calculateScores(this.clientRepository.findAll());

                    this.shuffleDeck();
                }
            }
        }else{            
            let unoClientNext = this.getNextClient(unoClient);
            if(unoClientNext instanceof UNOClient){
                UNOClient.setArrayTurn(this.clientRepository.findAll(), false);
                unoClientNext.setTurn(true);
            }
        }
        this.validateNextMove();
    }
    place(unoClient, cardData){

        if(!unoClient.getTurn())return false;

        if(typeof cardData.id !== 'undefined'){

            let card = this.cardRepository.findById(cardData.id);

            if(card instanceof Card){
                
                let numb = cardData.type.charAt(1);
                if((card.getType() === 'kg' || card.getType() === 'kc') && (numb === 'g' || numb === 'c')){
                    card.setType(cardData.type);
                }

                if(unoClient.getTakeOrLeave()){
                    //TODO check if card === unoClient.getTakeOrLeave()
                }
                
                this.clearEvents();

                //Check if card is allowed
                if(this.cardCanBePlaced(card)){
                    
                    //unoClient.getTakeOrLeave() || 

                    if(unoClient.removeCard(card)){
                        this.placeCard(card);
                        this.finishTurn(unoClient, card);
                    }
                }
            }
        }
    }
    take(unoClient){

        if(unoClient.getTurn()){
            
            this.clearEvents();

            if(unoClient.getTakeOrLeave()){
                this.finishTurn(unoClient);
                return;
            }

            let card = this.takeCard(unoClient);

            if(this.cardCanBePlaced(card) && !unoClient.getTakeOrLeave()){
                unoClient.setTakeOrLeave(card);
            }else{
                this.finishTurn(unoClient);
            }
            if(this.drawDeck.length == 0){
                this.reShuffleDeck();
            }
        }
    }    
    takeCard(unoClient){
        //Check for empty draw deck
        let card = this.drawDeck.pop();
        card.setMoveId(this.incrementMoveIndex());
        this.saveEvent(card, unoClient.getName());
        unoClient.addCard(card);
        return card;
    }
    placeCard(card){
        card.setMoveId(this.incrementMoveIndex());
        card.setOwner("dsc");
        this.saveEvent(card, "dsc");
        this.discardDeck.push(card);
    }
    incrementMoveIndex(){
        this.moveIndex++;
        return this.moveIndex;
    }
    saveEvent(card, owner){
        this.events.unshift({
            cardId: card.getId(),
            newOwner: owner
        });
    }
    clearEvents(){
        this.events = []
    }
    getEvents(){
        return this.events;
    }    
    getDrawDeckCount(){
        return this.drawDeck.length;
    }
    getDiscardDeck(){
        return this.discardDeck;
    }
    validateNextMove(){

        Card.setArrayNextMoveValid(this.cardRepository.findAll(), false);

        let client = this.clientRepository.findByTurn(true);
        if(client instanceof UNOClient){
            let cards = client.getCards();
            for(let i=0; i<cards.length; i++){
                if(this.cardCanBePlaced(cards[i])){
                    cards[i].setNextMoveValid(true);
                }
            }
        }        

        let card = this.drawDeck.slice(-1)[0];
        if(card instanceof Card){
            card.setNextMoveValid(true);
        }
    }
    getCardRepository(){
        return this.cardRepository;
    }
};