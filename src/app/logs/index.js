import angular from 'angular';

import logModelFactory from './log-model';
import logListControllerFactory from './log-list.controller';

import templateUrl from './log-list.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('logs', 'LogModel');

  $stateProvider.state('logs', {
    url: '/logs',
    templateUrl: templateUrl,
    controller: ['$scope', '$controller', 'LogListController', function($scope, $controller, LogListController) {
      $controller(LogListController, {$scope: $scope});
    }]
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.logs', [])
  .config(config)
  .factory('LogModel', logModelFactory)
  .factory('LogListController', logListControllerFactory)
  .name;
