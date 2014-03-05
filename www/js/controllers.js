'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', function ($scope, API) {
                var emptyEntities = [
                  {content: 'Потяните вниз, чтобы обновить'}
                ];
                $scope.criteria = {
                  page: Math.floor((Math.random() * 1000) + 1),
                  limit: 1
                };
                $scope.entities = emptyEntities;
                $scope.fetchResult = function () {
                  // Show the loading overlay and text
                  return API.compliment.getRecords($scope.criteria).then(function (data) {
                    $scope.entities = data;
                    delete $scope.error;
                    $scope.criteria.page = Math.floor(Math.random() * data.entitiesCount);
                  }, function (response) {
                    $scope.error = 'Для корректной работы приложения необходимо подключение к сети Интернет';
                    $scope.entities = emptyEntities;
                  });
                };
                $scope.onRefresh = function () {
                  $scope.fetchResult();
                  $scope.$broadcast('scroll.refreshComplete');
                };
              })
;