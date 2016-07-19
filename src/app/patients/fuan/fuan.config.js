(function() {
  'use strict';

  var app = angular.module('radar.patients.fuan');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.fuanClinicalPictures', {
      url: '/adtkd-clinical-pictures',
      templateUrl: 'app/patients/fuan/clinical-pictures.html'
    });
  }]);
})();
