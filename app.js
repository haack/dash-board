var socket = io();

$('#login').keyup(function(event) {
	if (event.keyCode == 13) {
		socket.emit('message', $.md5($('#login').val()));
	}
});