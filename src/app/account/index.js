import angular from 'angular';

import changePassword from './change-password';
import changeEmail from './change-email';

import templateUrl from './account.html';

function config($stateProvider) {
  $stateProvider.state('account', {
    url: '/account',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.account', [changePassword, changeEmail])
  .config(config)
  .factory('AccountController', require('./account-component.controller.js'))
  .directive('accountComponent', require('./account-component.directive.js'))
  .name;
