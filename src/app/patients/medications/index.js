import angular from 'angular';

function config($stateProvider) {
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.medications', [])
  .config(config)
  .name;
