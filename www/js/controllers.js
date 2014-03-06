'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', function ($scope, Restangular) {
                var emptyMsg = $scope.entity = {content: 'Потяните вниз, чтобы обновить'};
                $scope.fetchResult = function () {
                  // Show the loading overlay and text
                  return Restangular.all('compliment').customGET('random').then(function (data) {
                    $scope.entity = data;
                    delete $scope.error;
                  }, function (response) {
                    $scope.error = 'Для корректной работы приложения необходимо подключение к сети Интернет';
                    $scope.entity = emptyMsg;
                  });
                };
                $scope.onRefresh = function () {
                  $scope.fetchResult();
                  $scope.$broadcast('scroll.refreshComplete');
                };
              })
;