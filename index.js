var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var crypto = require('crypto');

var md5pass = "";

fs.readFile("pass.txt", "ascii", function(error, data) {
	md5pass = data;
    console.log("Loaded password: " + data);
	
	app.get('/', function(req, res){
		res.sendfile('index.html');
	});

	io.on('connection', function(socket){
		console.log('[INFO] user connected');
		socket.on('message', function(data) {
			var hash = crypto.createHash('md5').update(data).digest('hex');
			console.log("\nHashed pass: " + hash + "\n");
			if (hash === md5pass) {
				console.log("[SUCCESS]");
			} else {
				console.log("[FAIL]");
			}
		});
	});

	http.listen(3000, function(){
		console.log('[INFO] listening on *:3000');
	});    
});
