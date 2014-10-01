var socket = io();

var app = angular.module('app', []);

app.controller('LoginController', function($scope) {
	$scope.hey = 'hey.';

	$('#login').keyup(function(event) {
		if (event.keyCode == 13) {
			socket.emit('message', $.md5($('#login').val()));
		}
	});
});

