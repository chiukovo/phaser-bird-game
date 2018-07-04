var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
server.lastPlayderID = 0;

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

io.on('connection', function(socket){
    socket.player = {
        id: server.lastPlayderID++,
    };

    socket.broadcast.emit('createBird', socket.player);

    //start jump
    socket.on('startJump',function(){
        socket.broadcast.emit('startJump',socket.player);
    });
});