(function() {
  'use strict';

  var app = angular.module('radar.patients.forms');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.forms', {
      url: '/questionnaires',
      templateUrl: 'app/patients/forms/forms.html',
      resolve: {
        forms: ['$stateParams', 'formStore', '$state', function($stateParams, formStore, $state) {
          return formStore.getForms($stateParams.patientId);
        }]
      },
      controller: 'FormsController'
    });

    $stateProvider.state('patient.forms.form', {
      url: '/:formId',
      templateUrl: 'app/patients/forms/form.html',
      resolve: {
        form: ['$stateParams', 'formStore', function($stateParams, formStore) {
          return formStore.getForm($stateParams.formId);
        }]
      },
      controller: function($scope, form) {
        $scope.form = form;
      }
    });
  }]);
})();
