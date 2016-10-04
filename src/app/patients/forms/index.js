import angular from 'angular';

import {
  entryPermissionFactory,
  entriesControllerFactory,
  entriesComponent
} from './entries-component.directive';
import formStore from './form-store';
import QuestionnairesController from './questionnaires-controller';

import questionnairesTemplateUrl from './questionnaires.html';
import questionnaireTemplateUrl from './questionnaire.html';
import formTemplateUrl from './form.html';

function config($stateProvider) {
  $stateProvider.state('patient.questionnaires', {
    url: '/questionnaires',
    templateUrl: questionnairesTemplateUrl,
    resolve: {
      forms: ['$stateParams', 'formStore', function($stateParams, formStore) {
        return formStore.getQuestionnaires($stateParams.patientId);
      }]
    },
    controller: 'QuestionnairesController'
  });

  $stateProvider.state('patient.questionnaire', {
    parent: 'patient.questionnaires',
    url: '/:formSlug',
    templateUrl: questionnaireTemplateUrl,
    resolve: {
      form: ['$stateParams', 'formStore', function($stateParams, formStore) {
        return formStore.getForm($stateParams.formSlug);
      }]
    },
    controller: ['$scope', 'form', function($scope, form) {
      $scope.form = form;
    }]
  });

  $stateProvider.state('patient.form', {
    url: '/forms/:formSlug',
    templateUrl: formTemplateUrl,
    resolve: {
      form: ['$stateParams', 'formStore', function($stateParams, formStore) {
        return formStore.getForm($stateParams.formSlug);
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
  .controller('QuestionnairesController', QuestionnairesController)
  .name;
