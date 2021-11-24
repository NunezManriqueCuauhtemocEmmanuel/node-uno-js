
module.exports = class GameService{

    constructor(id, messageRepository, clientRepository) {
        this.id = id;
        //Notifications sent to clients
        this.messagesRepository = messageRepository;
        //Client repository, logged into server
        this.clientRepository = clientRepository;
        //Action handling. Actions are messages received from Clients
        this.actionHandlers = {};
    }
    handleAction(socket, action, data){

        data.socketId = socket.id;

        //Should be replaced with some sort of access token
        let clientName = data.client.name;

        for(let key in this.actionHandlers){
            if(key === action){                
                this.actionHandlers[key].handleAction(data);
                break;
            }
        }
    }
    getClientResponseData(socketId){
        return false;
    }
    getClientRepository(){
        return this.clientRepository;
    }
    getMessageRepository(){
        return this.messagesRepository;
    }    
};