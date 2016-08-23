(function() {
  'use strict';

  var app = angular.module('radar.patients.questionnaires');

  app.controller('QuestionnairesController', ['$scope', 'forms', function($scope, forms) {
    $scope.forms = forms;
  }]);
})();
