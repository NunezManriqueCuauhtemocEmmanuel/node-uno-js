
let express = require('express');
let application = express();
let server = require('https').Server(application);
let GameServiceFactory = require('./node_src/GameServiceFactory.js');
let GameServiceRepository = require('./node_src/GameServiceRepository.js');
let UnitTest = require('./node_src/UnitTest.js');
let unitTest = new UnitTest();

application.get('/', function(request, response){
    response.sendFile(__dirname + '/client/index.html');
});
application.use('/client', express.static(__dirname + '/client'));

const PORT = process.env.PORT || 7700;

server.listen(PORT, () => console.log(`Server corriendo en el puerto ${PORT}`))


let io = require('socket.io')(server, {});
let gameServiceRepository = new GameServiceRepository();
let gameServiceFactory = new GameServiceFactory();

io.sockets.on('connection', function(socket) {
    console.log('Socket connection');
    socket.on('create', function(room) {

        console.log('Join room: ' + room + ' socketId: ' + socket.id);
        socket.join(room);

        let gameService = gameServiceRepository.findById(room);

        if(!gameService){
            gameService = gameServiceFactory.create("UNO", room);
            gameServiceRepository.insert(gameService);
        }
        socket.use(function(packet){
            gameService.handleAction(socket, packet[0], packet[1]);             
            Object.keys(io.sockets.sockets).forEach(function(id) {
                let data = gameService.getClientResponseData(id);
                if(data){
                    io.to(id).emit('state', data);
                }
            });
        });
    });
});



