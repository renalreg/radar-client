(function() {
  'use strict';

  var app = angular.module('radar.patients.comorbidities');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.comorbidities', {
      url: '/comorbidities',
      templateUrl: 'app/patients/comorbidities/comorbidities.html'
    });
  }]);
})();
