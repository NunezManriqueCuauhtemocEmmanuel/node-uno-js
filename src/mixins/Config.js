import gsap from "gsap";

export default {
  data: function () {
    return {
        config:{
          boardWidth:600,
          boardHeight:650,
          initialized:false,
          playersInitialized:false,
          drawPos:{x:150,y:240},
          discardPos:{x:300,y:210},
          scoresPos:{x:370,y:210},          
          players:{},
          timeline:null,
          specialCard:false,
          opponentCardScale:0.5,
          screenWidth:null,
          screenHeight:null,
          opponentPosOffset:{
            1:[20],
            2:[20,20],
            3:[110,20,110],  
            4:[110,20,110,20]              
          }
      }
    }
  },
  methods:{
    namePosition:function(clientName){
      if(typeof this.config.players[clientName] !== 'undefined'){  
          let pos = this.config.players[clientName];              
          if(clientName === this.self){
              return {
                  x:pos.x,
                  y:pos.y + 170
              };
          }else{
              return {
                  x:pos.x,
                  y:pos.y + 120
              };
          }
      }
    },
    initClientsConfig:function(clients){                
      this.config.players = {};
      let count = clients.length - 1;
      let marg = this.config.boardWidth / count;
      let index = 0;
      let offsets = this.config.opponentPosOffset[count];
      for(let i=0; i<clients.length; i++){
          if(clients[i].name == this.self){
              this.config.players[clients[i].name] = {
                  x:(this.config.boardWidth * 0.5),
                  y:this.config.boardHeight - 220,
                  scale:1.2
              };
          }else{
             this.config.players[clients[i].name] = {
                  x:((marg / 2) + (index * marg)),
                  y:offsets[index],
                  scale: this.config.opponentCardScale
              };
              index++;
          }
      }
    },     
  },
  mounted:function(){
    this.config.timeline = gsap.timeline();
    this.config.screenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    this.config.screenHeigh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    this.config.boardWidth = Math.min(600, this.config.screenWidth);
    this.config.boardHeight = 800;
    this.config.drawPos.y = (this.config.boardHeight * 0.5) - 60;
    this.config.discardPos.y = (this.config.boardHeight * 0.5) - 80;
    this.config.scoresPos.y = (this.config.boardHeight * 0.5) - 60;
  }
}