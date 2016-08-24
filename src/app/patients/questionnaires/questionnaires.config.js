(function() {
  'use strict';

  var app = angular.module('radar.patients.questionnaires');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.questionnaires', {
      url: '/questionnaires',
      templateUrl: 'app/patients/questionnaires/questionnaires.html',
      resolve: {
        forms: ['$stateParams', 'store', 'adapter', 'patient', function($stateParams, store, adapter, patient) {
          // Get forms for patient
          return adapter.get('/form-counts', {patient: patient.id}).then(function(response) {
            var forms = _.map(response.data.data, function(x) {
              return {
                form: store.pushToStore(store.create('forms', x.form)),
                count: x.count
              };
            });

            return forms;
          });
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
