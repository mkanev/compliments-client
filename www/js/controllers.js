'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', function ($scope, Restangular) {
                var emptyMsg = {content: 'Потяните вниз, чтобы обновить'};
                $scope.entity = emptyMsg;
                $scope.fetchResult = function () {
                  // Show the loading overlay and text
                  $scope.disableSend();
                  $scope.disableRefresh();
                  return Restangular.all('compliment').customGET('random').then(function (data) {
                    $scope.entity = data;
                    $scope.enableSend();
                    $scope.enableRefresh();
                    delete $scope.error;
                  }, function (response) {
                    $scope.error = 'Для корректной работы приложения необходимо подключение к сети Интернет';
                    $scope.enableRefresh();
                    $scope.entity = emptyMsg;
                  });
                };
                $scope.onRefresh = function () {
                  if ($scope.refreshEnabled) {
                    $scope.fetchResult();
                  }
                  $scope.$broadcast('scroll.refreshComplete');
                };
                $scope.enableRefresh = function() {
                  $scope.refreshEnabled = true;
                };
                $scope.disableRefresh = function() {
                  $scope.refreshEnabled = false;
                };
                $scope.enableSend = function() {
                  $scope.sendEnabled = true;
                };
                $scope.disableSend = function() {
                  $scope.sendEnabled = false;
                };

                $scope.enableRefresh();
              })
;