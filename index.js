var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var crypto = require('crypto');

var md5pass = "";

fs.readFile("pass.txt", "ascii", function(error, data) {

	md5pass = data;
    console.log("Loaded password: " + data);

	io.on('connection', function(socket) {
		console.log('[INFO] user connected');
		socket.on('message', function(data) {
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


	app.get('/', function(req, res) {
		res.sendfile('index.html');
	});

	app.get('/jquery-md5', function(req, res) {
		res.sendfile('bower_components/jquery-md5/jquery.md5.js');
	});

	app.get('/jquery', function(req, res) {
		res.sendfile('bower_components/jquery/dist/jquery.js');
	});

	app.get('/app.js', function(req, res) {
		res.sendfile('app.js');
	});

	app.get('/styles/style.css', function(req, res) {
		res.sendfile('styles/style.css');
	});

	app.get('/bootstrap.css', function(req, res) {
		res.sendfile('bower_components/bootstrap/dist/css/bootstrap.min.css');
	});

	app.get('/bootstrap', function(req, res) {
		res.sendfile('bower_components/bootstrap/dist/js/bootstrap.min.js');
	});

	app.get('/angular', function(req, res) {
		res.sendfile('bower_components/angular/angular.js');
	});

	app.get('/angular.min.js.map', function(req, res) {
		res.sendfile('bower_components/angular/angular.min.js.map');
	});
});
