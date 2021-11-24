let PublicGameRulesModel = require('./PublicGameRulesModel.js');
let PublicClientsModel = require('./PublicClientsModel.js');

module.exports = class ClientResponseBuilder{
    constructor(clientRepository, gameRulesModel) {
        this.gameRulesModel = gameRulesModel;
        this.clientRepository = clientRepository;
    }
    build(client){
        return {
            client: client,
            clients: (new PublicClientsModel(this.clientRepository)).getClients(),
            game: new PublicGameRulesModel(client, this.gameRulesModel),
            //messages: this.getMessageRepository().findByClient(client)
        };
    }
};