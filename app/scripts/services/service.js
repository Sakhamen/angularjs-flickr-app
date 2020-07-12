'use strict';

angular.module('flickr.services', [])

.service('geolocationService', function($q, $window) {
    var service = {};

    // 10sec timeout
    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    service.getCurrentLocation = function() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (result) {
                    deferred.resolve(result);
                },
                function (err) {
                    deferred.reject(err);
                }, options);
        }

        return deferred.promise;
    };

    return service;
})

.service('flickrService', function($http, $q, CONFIG, localStorageFactory) {
    var service = {};
    var url = CONFIG.api_url;

    var params = {
        per_page: 24,
        format: 'json',
        nojsoncallback: 1,
        api_key: CONFIG.api_key
    };

    service.getPhotosBySearch = function(text) {
        var deferred = $q.defer();

        text = text || 'durban';

        // append
        params.tags = text;
        params.method = 'flickr.photos.search';

        $http.get(url, {
            params: params
		}).then(function(result) {
			deferred.resolve(result.data);
		}).catch(function(error) {
			deferred.reject(error);
		});

        return deferred.promise;
    };

    service.getPhotosByGeo = function(coords) {
        var deferred = $q.defer();

        params.method = 'flickr.photos.search';
        params.lat = coords.latitude;
        params.lon = coords.longitude;
        params.accuracy = 1;

        $http.get(url, {
            params: params
		}).then(function(result) {
			deferred.resolve(result.data);
		}).catch(function(error) {
			deferred.reject(error);
		});

        return deferred.promise;
    };

    service.getPhotoDetail = function(id) {
        var deferred = $q.defer();

        params.photo_id = id;
        params.method = 'flickr.photos.getInfo';

        $http({
            method: 'GET',
            url: url,
            params: params
        }).then(function (result) {
            deferred.resolve(result.data);
        }, function (result) {
            deferred.reject(result);
        });

        return deferred.promise;
    };

    service.constructImageSrc = function (photo, format = 'c') {
        var {farm,server,id,secret} = photo;
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${format}.jpg`;
    };

    return service;
})

.factory('localStorageFactory', function () {
    var service = {};

    service.saveLocalData = function (key, item) {
        var storedValue = JSON.parse(localStorage.getItem(key));
        if (storedValue) item += '&' + storedValue; // Recent first
        return localStorage.setItem(key, JSON.stringify(item));
    };

    service.getLocalData = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };

    service.getLocalDataAsArray = function (key) {
        var _array = JSON.parse(localStorage.getItem(key));
        return (_array) ? _array.split('&') : [];
    };

    service.removeLocalData = function (key) {
        return localStorage.removeItem(key);
    };

    return service;
});
