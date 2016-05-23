(function() {
  'use strict';

  var app = angular.module('radar.patients.pkd');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.liverImaging', {
      url: '/liver-imaging',
      templateUrl: 'app/patients/pkd/liver-imaging.html'
    });
  }]);
})();
