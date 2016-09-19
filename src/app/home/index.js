import angular from 'angular';

import templateUrl from './home.html';

function config($stateProvider) {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: templateUrl,
    data: {
      public: true
    }
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.home', [])
  .config(config)
  .name;
