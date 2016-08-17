(function() {
  'use strict';

  var app = angular.module('radar.patients.questionnaires');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.questionnaires', {
      url: '/questionnaires',
      templateUrl: 'app/patients/questionnaires/questionnaires.html'
    });

    $stateProvider.state('patient.questionnaire', {
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
