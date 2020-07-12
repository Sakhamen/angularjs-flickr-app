'use strict';

angular.module('flickr.controllers', [])

.controller('HomeCtrl', function($scope, $timeout, $location, geolocationService, flickrService, localStorageFactory) {
    // variable declaration
    $scope.searchTerm = '';
    $scope.prevSearch = [];
    $scope.isGeoSearch = false;
    $scope.isGeoError = false;
    $scope.isTextSearch = false;

    // clear prev search
    localStorageFactory.removeLocalData('search');

    // get previous searches
    $scope.prevSearch = localStorageFactory.getLocalDataAsArray('searchTerms');

    $scope.getCurrentLocation = function () {
        $scope.isGeoSearch = true;
        geolocationService.getCurrentLocation().then(function(position) {
          // console.log('getCurrentLocation', position);
          $scope.isGeoSearch = false;
          var { coords } = position;

          var data = {
              isGeo: true,
              position: {
                 latitude: coords.latitude,
                 longitude: coords.longitude
              }
          };

          $location.path("/photos").search({options: data});
        }, function (error) {
            $scope.isGeoSearch = false;
            $scope.isGeoError = true;
            console.error('getCurrentLocation', error);
        });
    };

    $scope.search = function () {
        if (!$scope.searchTerm || $scope.searchTerm.length < 3) {
            return;
        }
        $scope.isTextSearch = true;

        // save to localStorage
        localStorageFactory.saveLocalData('searchTerms', $scope.searchTerm);

        var data = {
            isGeo: false,
            value: $scope.searchTerm
        };

        // 1 sec delay
        $timeout(function() {
            $location.path("/photos").search({options: data});
        }, 1000);
    };

    $scope.navigate = function (text) {
        var data = {
            isGeo: false,
            value: text
        };
        $location.path("/photos").search({options: data});
    };

    $scope.reloadPage = function() {
       window.location.reload();
   };

})

.controller('photosCtrl', function($scope, $routeParams, $location, flickrService, localStorageFactory) {
    var data = $routeParams.options;

    // variable declaration
    $scope.photos = [];
    $scope.isEmpty = false;
    $scope.locationName = (data.value) ? data.value : '';
    $scope.isGeoSearch = (data.isGeo) ? true : false;

    // get recent search keyword
    if (!$scope.locationName && !$scope.isGeoSearch) $scope.locationName = localStorageFactory.getLocalData('search');
    else if ($scope.locationName) localStorageFactory.saveLocalData('search', $scope.locationName);

    if ($scope.isGeoSearch) {

      flickrService.getPhotosByGeo(data.position).then(function(result) {
         // console.log('******getPhotosByGeo', result);
          $scope.photos = result.photos.photo;
          $scope.isEmpty = ($scope.photos.length) ? false : true;
      }, function (error) {
          console.error('getPhotosByGeo', error);
      });

    } else {

        flickrService.getPhotosBySearch($scope.locationName).then(function(result) {
           // console.log('******getPhotosBySearch', result);
            $scope.photos = result.photos.photo;
            $scope.isEmpty = ($scope.photos.length) ? false : true;
        }, function (error) {
            console.error('getPhotosBySearch', error);
        });

    }

    $scope.getImageSrc = function(photo) {
      return flickrService.constructImageSrc(photo, 'n'); //z
   };

    $scope.back = function() {
        window.history.back();
    };

})

.controller('photoCtrl', function($scope, $routeParams, flickrService) {
    var data = $routeParams.id;

    // variable declaration
    $scope.photoDetails = {};

    flickrService.getPhotoDetail(data).then(function(result) {
        // console.log('getPhotoDetail**', result);
        $scope.photoDetails = result.photo;
        $scope.photoDetails.image = flickrService.constructImageSrc(result.photo);
    }, function (error) {
        console.error('getPhotoDetail', error);
    });

    $scope.back = function() {
        window.history.back();
    };
});

// Clear the local storage
window.onunload = () => {
   window.localStorage.clear();
};
