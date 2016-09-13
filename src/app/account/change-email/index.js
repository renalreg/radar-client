import angular from 'angular';

import changeEmailControllerFactory from './change-email-component.controller';
import changeEmailComponent from './change-email-component.directive';

import templateUrl from './change-email.html';

function config($stateProvider) {
  $stateProvider.state('changeEmail', {
    url: '/change-email',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider']; 

export default angular.module('radar.account.changeEmail', [])
  .factory('ChangeEmailController', changeEmailControllerFactory)
  .directive('changeEmailComponent', changeEmailComponent)
  .config(config)
  .name;