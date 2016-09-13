import angular from 'angular';

import {
  changePasswordControllerFactory,
  changePasswordComponent
} from './change-password-component.directive';

import templateUrl from './change-password.html';

function config($stateProvider) {
  $stateProvider.state('changePassword', {
    url: '/change-password',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.account.changePassword', [])
  .factory('ChangePasswordController', changePasswordControllerFactory)
  .directive('changePasswordComponent', changePasswordComponent)
  .config(config)
  .name;
