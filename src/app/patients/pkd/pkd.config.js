(function() {
  'use strict';

  var app = angular.module('radar.patients.pkd');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.liverImaging', {
      url: '/liver-imaging',
      templateUrl: 'app/patients/pkd/liver-imaging.html'
    });

    $stateProvider.state('patient.liverTransplants', {
      url: '/liver-transplants',
      templateUrl: 'app/patients/pkd/liver-transplants.html'
    });

    $stateProvider.state('patient.liverDiseases', {
      url: '/liver-diseases',
      templateUrl: 'app/patients/pkd/liver-diseases.html'
    });

    $stateProvider.state('patient.nutrition', {
      url: '/nutrition',
      templateUrl: 'app/patients/pkd/nutrition.html'
    });
  }]);
})();
