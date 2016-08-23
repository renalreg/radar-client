(function() {
  'use strict';

  var app = angular.module('radar.patients.questionnaires');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.questionnaires', {
      url: '/questionnaires',
      templateUrl: 'app/patients/questionnaires/questionnaires.html',
      resolve: {
        forms: ['$stateParams', 'store', function($stateParams, store) {
          // TODO filter by patient
          return store.findMany('forms');
        }]
      },
      controller: 'QuestionnairesController'
    });

    $stateProvider.state('patient.questionnaires.questionnaire', {
      url: '/questionnaires/:questionnaireId',
      templateUrl: 'app/patients/questionnaires/questionnaire.html',
      resolve: {
        form: ['$stateParams', 'store', function($stateParams, store) {
          return store.findOne('forms', $stateParams.questionnaireId);
        }]
      },
      controller: function($scope, form) {
        $scope.form = form;
      }
    });
  }]);
})();
