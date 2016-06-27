(function() {
  'use strict';

  var app = angular.module('radar.diagnoses');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('diagnoses', {
      url: '/diagnoses',
      templateUrl: 'app/diagnoses/diagnoses.html'
    });
  }]);
})();
