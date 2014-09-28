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

	app.get('/jquery-md5', function(req, res){
		res.sendfile('bower_components/jquery-md5/jquery.md5.js');
	});

	app.get('/jquery', function(req, res){
		console.log("serving jquery");
		res.sendfile('bower_components/jquery/dist/jquery.js');
	});

	io.on('connection', function(socket){
		console.log('[INFO] user connected');
		socket.on('message', function(data) {
			console.log("\nHashed pass: " + data + "\n");
			if (data === md5pass) {
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
