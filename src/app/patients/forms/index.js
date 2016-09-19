import angular from 'angular';

import {
  entryPermissionFactory,
  entriesControllerFactory,
  entriesComponent
} from './entries-component.directive';
import formStore from './form-store';
import FormsController from './forms-controller';

import formsTemplateUrl from './forms.html';
import formTemplateUrl from './form.html';

function config($stateProvider) {
  $stateProvider.state('patient.forms', {
    url: '/questionnaires',
    templateUrl: formsTemplateUrl,
    resolve: {
      forms: ['$stateParams', 'formStore', function($stateParams, formStore) {
        return formStore.getForms($stateParams.patientId);
      }]
    },
    controller: 'FormsController'
  });

  $stateProvider.state('patient.forms.form', {
    url: '/:formId',
    templateUrl: formTemplateUrl,
    resolve: {
      form: ['$stateParams', 'formStore', function($stateParams, formStore) {
        return formStore.getForm($stateParams.formId);
      }]
    },
    controller: ['$scope', 'form', function($scope, form) {
      $scope.form = form;
    }]
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.forms', [])
  .config(config)
  .factory('EntryPermission', entryPermissionFactory)
  .factory('EntriesController', entriesControllerFactory)
  .directive('entriesComponent', entriesComponent)
  .factory('formStore', formStore)
  .controller('FormsController', FormsController)
  .name;
