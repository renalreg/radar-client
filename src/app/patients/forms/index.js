import angular from 'angular';

import {
  entriesControllerFactory,
  entriesComponent
} from './entries-component.directive';
import {
  entryControllerFactory,
  entryComponent
} from './entry-component.directive';
import formStore from './form-store';
import QuestionnairesController from './questionnaires-controller';
import formComponent from './form-component.directive';
import entryPermissionFactory from './entry-permission';

import questionnairesTemplateUrl from './questionnaires.html';
import questionnaireTemplateUrl from './questionnaire.html';
import formTemplateUrl from './form.html';

function config($stateProvider) {
  $stateProvider.state('patient.questionnaires', {
    url: '/questionnaires/:cohortId',
    templateUrl: questionnairesTemplateUrl,
    resolve: {
      forms: ['$stateParams', 'formStore', function($stateParams, formStore) {
        return formStore.getQuestionnaires($stateParams.cohortId, $stateParams.patientId);
      }],
      cohort: ['$stateParams', 'cohortStore', function($stateParams, cohortStore) {
        return cohortStore.findOne($stateParams.cohortId);
      }]
    },
    controller: 'QuestionnairesController'
  });

  $stateProvider.state('patient.questionnaire', {
    parent: 'patient.questionnaires',
    url: '/{formSlug:[a-z0-9-]+}',
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
  .directive('formComponent', formComponent)
  .factory('EntryController', entryControllerFactory)
  .directive('entryComponent', entryComponent)
  .name;
