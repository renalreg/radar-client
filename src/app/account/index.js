import angular from 'angular';

import changePassword from './change-password';
import changeEmail from './change-email';

import {
  accountControllerFactory,
  accountComponent
} from './account-component.directive';

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
  .factory('AccountController', accountControllerFactory)
  .directive('accountComponent', accountComponent)
  .name;
