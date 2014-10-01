var socket = io();

var app = angular.module('app', []);

app.controller('LoginController', function($scope) {

	$.ajax({
		url: "/message",
		success: function (data) {
			$scope.$apply(function() {
				$scope.hey = data;
			});
		}
	});

	$('#login').keyup(function(event) {
		if (event.keyCode == 13) {
			socket.emit('message', $.md5($('#login').val()));
		}
	});
});

