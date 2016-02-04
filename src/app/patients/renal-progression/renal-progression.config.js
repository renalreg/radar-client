(function() {
  'use strict';

  var app = angular.module('radar.patients.renalProgression');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.renalProgression', {
      url: '/renal-progression',
      templateUrl: 'app/patients/renal-progression/renal-progression.html'
    });
  }]);
})();
