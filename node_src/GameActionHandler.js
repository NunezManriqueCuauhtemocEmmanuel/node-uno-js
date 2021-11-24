/**
 * Base class for GameService user action handlers
 * @type {module.GameActionHandler}
 */
module.exports = class GameActionHandler{
    constructor(gameService){
        this.gameService = gameService;
    }
    getGameService(){
        return this.gameService;
    }
    handleAction(data){

    }    
};