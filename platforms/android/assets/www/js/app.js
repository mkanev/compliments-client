'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ionic',
    'restangular',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
  ])
  .config(function ($locationProvider, $httpProvider, RestangularProvider) {

            RestangularProvider.setBaseUrl('http://agile-anchorage-3289.herokuapp.com/rest');
            RestangularProvider.addResponseInterceptor(function (data, operation) {
              if (operation === 'getList' && !_.isArray(data)) {
                var newResponse = data['entries'];
                newResponse.entitiesCount = data['totalCount'];
                newResponse.pageSize = data['pageSize'];
                newResponse.pagesCount = data['pageCount'];
                return newResponse;
              }
              return data;
            });

            RestangularProvider.setDefaultHeaders({
                                                    'Host': 'agile-anchorage-3289.herokuapp.com',
                                                    'User-Agent': 'Mozilla/5.0',
                                                    'Accept': '*/*',
                                                    'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
                                                    'Accept-Charset': 'utf-8',
                                                    'Connection': 'keep-alive',
                                                    'Referer': 'http://agile-anchorage-3289.herokuapp.com'
                                                  });
          })
  .run(function(){
         angular.element(document.body).css('opacity', 1);
       })
;