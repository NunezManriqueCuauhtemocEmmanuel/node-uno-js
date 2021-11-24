<template>
    <div class="frame" :style="{width:config.boardWidth+'px', height:config.boardHeight+'px'}">
        <Authorize :client="state.client" :socket="socket"></Authorize>

        <Board v-if="state.client.code">            
            <Scores :clients="state.clients" :position="config.scoresPos"></Scores>
            <Card v-for="card in state.game.cards" 
                    :ref="'card'+card.id"
                    :card="card"
                    :key="card.id"
                    :clickHandler="cardOnClick"
                    :transitionFinishHandler="cardTransitionFinish"
                    :timeline="config.timeline"
                    :active="state.client.turn"></Card>

            <div v-if="config.playersInitialized && !state.game.winner && state.game.ready" >
                <NamePlate v-for="(client, index) in state.clients" :key="'client_'+index" :client="client" :position="namePosition(client.name)"></NamePlate>
            </div>            
        </Board>
        <div class="board-overlay" v-if="overlayVisible">
            <PopupReady v-if="!state.game.winner && !state.game.ready" :buttonHandler="ready" :showButton="!state.client.ready"></PopupReady>
            <PopupWon v-if="state.game.winner" :buttonHandler="ready" :winner="state.game.winner" :showButton="!state.client.ready"></PopupWon>
            <PopupSpecial v-if="config.specialCard" :clickHandler="playCardSpecial" :card="config.specialCard"></PopupSpecial>
            <PopupTake v-if="!config.specialCard && state.client.takeOrLeave" :card="state.client.takeOrLeave" :takeHandler="takeCard" :leaveHandler="playCardTOL"></PopupTake>
        </div>        
    </div>
</template>

<script>
    
    import Board from "./components/Board"
    import Card from "./components/Card"    
    import PopupReady from "./components/PopupReady"    
    import PopupWon from "./components/PopupWon"    
    import PopupSpecial from "./components/PopupSpecial"    
    import PopupTake from "./components/PopupTake"   
    import NamePlate from "./components/NamePlate"    
    import Scores from "./components/Scores"
    import Authorize from "./components/Authorize"   

    import testDataNew from "../public/testDataNew.json"

    import ConfigMixin from "./mixins/Config"   
    import ClientMixin from "./mixins/Client"   

    const OWNER_DRAW_DECK = "draw"
    const OWNER_DISCARD_DECK = "dsc"    

    export default {
        name: "UnoGame",
        props: {
            socket: { type: Object },
        },
        mixins: [
            ConfigMixin, 
            ClientMixin
        ],
        components: {
            Board, 
            Card, 
            Authorize, 
            PopupReady, 
            PopupWon,
            PopupSpecial,
            PopupTake,
            NamePlate,
            Scores
        },            
        data: function() {
            return {
                state:{
                    clients:[],
                    game:{
                        cards:[],
                        events:[]
                    },
                }
            }
        },
        computed:{
            overlayVisible:function(){
                return this.state.client.code 
                    && ((!this.state.game.winner && !this.state.game.ready) 
                    || this.state.game.winner
                    || this.config.specialCard
                    || (!this.config.specialCard && this.state.client.takeOrLeave)
                    ); 
            }            
        },
        methods:{                     
            playCard:function(card){
                if(card.type === 'kc' || card.type === 'kg'){
                    this.config.specialCard = card;
                }else{
                    this.state.client.turn = false;
                    this.cardSetOwner(card, OWNER_DISCARD_DECK); 
                    this.config.specialCard = false;
                    this.socket.emit('place', {'client': this.state.client, card:card});
                }
            },
            playCardSpecial:function(cardId, type){
                let card = this.state.game.cards.find(function(elem){
                    return elem.id == cardId;
                });
                if(typeof card !== 'undefined'){
                    card.type = type;
                    this.playCard(card);
                }
            },
            playCardTOL:function(cardId){
                let card = this.state.game.cards.find(function(elem){
                    return elem.id == cardId;
                });
                if(typeof card !== 'undefined'){
                    this.playCard(card);
                }                
            },
            takeCard:function(){
                this.socket.emit('take', {'client': this.state.client});
            },            
            cardSetOwner:function(card, owner){

                switch(owner){
                    case OWNER_DRAW_DECK:
                        this.transitionToDrawDeck(card);
                    break;
                    case OWNER_DISCARD_DECK:
                        this.transitionToDiscardDeck(card);                    
                    break;
                    default:
                         this.transitionToHand(card, owner);              
                };
            },
            transitionToDrawDeck:function(card){

                card.owner = OWNER_DRAW_DECK;

                card.transform.x = this.config.drawPos.x + (5 - (Math.random()*10));
                card.transform.y = this.config.drawPos.y + (5 - (Math.random()*10));
                card.transform.angle = (5 - (Math.random()*10));
                card.transform.z = 150 + parseInt(card.moveId);
                card.transform.scale = 1;
                card.transform.d = 0;
            },
            transitionToDiscardDeck:function(card){

                card.owner = OWNER_DISCARD_DECK;

                card.transform.x = this.config.discardPos.x + (10 - (Math.random()*20));
                card.transform.y = this.config.discardPos.y + (10 - (Math.random()*20));
                card.transform.angle = (10 - (Math.random()*20));
                card.transform.z = 200;
                card.transform.scale = 1;
                card.transform.d = 0.4;
            },
            transitionToHand:function(card, owner){
                if(typeof this.config.players[owner] !== 'undefined'){
                    
                    let config = this.config.players[owner];

                    card.owner = owner;

                    card.transform.x = config.x + (5 - (Math.random()*10));
                    card.transform.y = config.y + (5 - (Math.random()*10));
                    card.transform.z = 300;
                    card.transform.angle = (10 - (Math.random()*20));
                    card.transform.scale = config.scale;
                    card.transform.d = 0.3;
                }
            },
            cardOnClick:function(card){

                if(card.owner == OWNER_DRAW_DECK && card.nextMoveValid && this.state.client.turn){

                    this.takeCard();

                    this.cardSetOwner(card, this.self);

                    this.state.client.turn = false;

                }else if(card.owner == this.self && card.nextMoveValid){
                    this.playCard(card);                    
                }
            },
            cardTransitionFinish:function(card){
                for(let i=0; i<this.state.clients.length; i++){
                    this.updateHand(this.state.clients[i].name);
                }    
            },
            initDeck:function(data){                 
                this.state.game.cards = data;
                for(let i=0; i<this.state.game.cards.length; i++){                    
                    this.cardSetOwner(this.state.game.cards[i], this.state.game.cards[i].owner);                               
                }                 
            },
            updateHand:function(player){
                let clientCards = [];
                for(let i=0; i<this.state.game.cards.length; i++){
                    if(this.state.game.cards[i].owner == player){
                        clientCards.push(this.state.game.cards[i]);
                    }
                }

                clientCards.sort(function(a,b){
                    if(a.type < b.type)return -1;
                    if(a.type > b.type)return 1;                    
                    return 0;
                });

                let config = this.config.players[player];

                let scale = (player === this.self)?1.2:this.config.opponentCardScale;

                let pivotSetting = (player === this.self)?400:200;

                let angleRangeDiv = (player === this.self)?7:9;
                let maxAngle = (player === this.self)?50:35;

                let cardsCount = clientCards.length;
                let angleRange = (cardsCount * 30) / angleRangeDiv;
                angleRange = Math.min(angleRange, maxAngle);

                let angleMin = -(angleRange / 2);
                let angleMax = (angleRange / 2);
                let angleStep = (angleMax - angleMin) / (cardsCount - 1);
                let angle = angleMin;

                let posZ = 50;

                for(let i=0; i<clientCards.length; i++){

                    let cosi = (1 - Math.cos(angle * (Math.PI / 180))) * pivotSetting;
                    let sini = (Math.sin(angle * (Math.PI / 180))) * pivotSetting;

                    clientCards[i].transform.angle = angle;
                    if(typeof config !== 'undefined'){
                        clientCards[i].transform.x = config.x + sini;
                        clientCards[i].transform.y = config.y + cosi;
                    }
                    clientCards[i].transform.z = posZ;
                    clientCards[i].transform.scale = scale;
                    clientCards[i].transform.d = 0.05;

                    posZ++;
                    angle += angleStep;
                }
            },
            updateDiscardDeck:function(){
                let clientCards = [];
                for(let i=0; i<this.state.game.cards.length; i++){
                    if(this.state.game.cards[i].owner == OWNER_DISCARD_DECK){
                        clientCards.push(this.state.game.cards[i]);
                    }
                }
                clientCards.sort(function(a,b){
                    if(parseInt(a.moveId) < parseInt(b.moveId))return -1;
                    if(parseInt(a.moveId) > parseInt(b.moveId))return 1;                    
                    return 0;
                });

                let posZ = 0;
                for(let i=0; i<clientCards.length; i++){
                    clientCards[i].transform.z = posZ;
                    posZ++;
                }
            },            
            processEvents:function(){
                for(let i=0; i<this.state.game.events.length; i++){
                    let event = this.state.game.events[i];
                    if(typeof this.state.game.cards[event.cardId] !== 'undefined'){
                        this.cardSetOwner(this.state.game.cards[event.cardId], event.newOwner);
                    }
                }
            },
            updateState:function(cards){
                for(let i=0; i<this.state.game.cards.length; i++){
                    if(typeof cards[i] === 'undefined')continue;
                    this.state.game.cards[i].moveId = cards[i].moveId;    

                    if(cards[i].owner !== this.state.game.cards[i].owner){
                        this.cardSetOwner(this.state.game.cards[i], cards[i].owner);
                    }

                    this.state.game.cards[i].owner = cards[i].owner;
                    this.state.game.cards[i].type = cards[i].type;    
                    this.state.game.cards[i].nextMoveValid = cards[i].nextMoveValid;                    
                }
            },
            gameStateResponse(response){

                //console.log(response);

                this.state.client = response.client;

                this.state.clients = response.clients;
                
                this.state.game.events = response.game.events;
                this.state.game.winner = response.game.winner;
                this.state.game.ready = response.game.ready;
                
                if(!this.config.initialized && response.game.cards.length > 0){
                    this.config.initialized = true;
                    this.initDeck(response.game.cards);
                
                }else if(this.config.initialized && response.game.events.length > 0){
                    if(!this.config.playersInitialized){
                        this.config.playersInitialized = true;
                        this.initClientsConfig(this.state.clients);
                    }              
                    this.processEvents();
                }
                this.updateState(response.game.cards);
                this.updateDiscardDeck();
            },
        },
        mounted:function () {

            this.socket.on('state', this.gameStateResponse);

            //this.gameStateResponse(testDataNew);

        },
        beforeDestroy:function () {

        }

    }
</script>

<style scoped>
    .frame{
        top:5px;
        position:relative;
        width:800px;
        margin:0 auto;    
    }
    .board-overlay{
        position:absolute;
        width:100%;
        height:100%;
        transform: translateZ(500px);
    }
</style>