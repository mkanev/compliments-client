'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', function ($scope, API) {
                $scope.criteria = {
                  page: Math.floor((Math.random() * 1000) + 1),
                  limit: 1
                };
                $scope.entities = [
                  {content: 'Потяните вниз, чтобы обновить'}
                ];
                $scope.fetchResult = function () {
                  return API.compliment.getRecords($scope.criteria).then(function (data) {
                    $scope.entities = data;
                    $scope.criteria.page = Math.floor(Math.random() * data.entitiesCount);
                  }, function (response) {
                    console.log("Error with status code", response.status);
                  });
                };
                $scope.onRefresh = function () {
                  $scope.fetchResult();
                  $scope.$broadcast('scroll.refreshComplete');
                }
              })
;