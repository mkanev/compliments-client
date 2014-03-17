'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .factory('GenericApi', function ($rootScope, Restangular) {
             return {
               getEndpoint: function (path) {
                 return Restangular.all(path);
               }
             };
           })
  .factory('GenericEntityApi', function ($rootScope, GenericApi) {
             return {
               getEntityList: function (path, query) {
                 return GenericApi.getEndpoint(path).getList(query);
               }
             };
           })
  .factory('API', function (GenericApi, GenericEntityApi) {
             return {
               compliment: {
                 getRecords: function (query) {
                   return GenericEntityApi.getEntityList('compliment', query);
                 }
               }
             }
           })
;
