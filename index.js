var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');    
});


var namespace = io.of('/namespace');

namespace.on('connection', function (socket) {
    console.log('a user connected');
    console.log('socket : ' + socket);


    socket.on('disconnect', function () {
        console.log('user disconnected');
    });


    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        namespace.emit('chat message', msg);
    });
});

var port = process.argv.slice(2)[0] || (process.env.PORT || 8080);
http.listen(port, function () {
	console.log("SERVER IS LISTENING ON PORT: " + port);
	console.log("CTRL+C TO STOP ");
});

process.on('SIGINT', function () {	
	console.log('BYE BYE, STOPPED GRACIOUSLY!');
	process.exit();
});
