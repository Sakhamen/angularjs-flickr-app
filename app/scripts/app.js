'use strict';

var app = angular.module('flickr', ['flickr.controllers', 'flickr.services', 'ngRoute']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');

	// routes
  $routeProvider
			.when("/", {
				templateUrl: "views/home.html",
				controller: "HomeCtrl"
			})
			.when("/photos", {
				templateUrl: "views/photos.html",
				controller: "photosCtrl"
			})
			.when("/photo/:id", {
				templateUrl: "views/photo-details.html",
				controller: "photoCtrl"
			})
			.otherwise({redirectTo: '/'});
}]);
