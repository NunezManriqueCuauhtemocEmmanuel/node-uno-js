let GameService = require('./GameService.js');
let UNOGameService = require('./UNO/UNOGameService.js');

module.exports = class GameServiceFactory{

    constructor() {

    }
    create(name, channel){
        if(name === "UNO"){
            return new UNOGameService(channel);
        };
        return null;
    }

};