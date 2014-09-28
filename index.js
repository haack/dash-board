var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var md5pass = "";

fs.readFile("pass.txt", "ascii", function(error, data) {
	md5pass = data.slice(0,-1);
    console.log("Loaded password: " + data);
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('[INFO] user connected');
  socket.on('message', function(data) {
  	console.log("\nMessage recieved: " + data + "\n");
  	if (data === md5pass) {
  		console.log("[SUCCESS]");
  	} else {
  		console.log("[FAIL]");
  		console.log(md5pass.length + "!=" + data.length);
  	}
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});