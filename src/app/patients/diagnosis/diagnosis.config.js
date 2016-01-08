(function() {
  'use strict';

  var app = angular.module('radar.patients.diagnosis');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.diagnosis', {
      url: '/diagnosis/:cohortId',
      templateUrl: 'app/patients/diagnosis/diagnosis.html',
      controller: ['$scope', 'cohort', function($scope, cohort) {
        $scope.cohort = cohort;
      }],
      resolve: {
        cohort: ['$stateParams', 'store', function($stateParams, store) {
          return store.findOne('cohorts', $stateParams.cohortId, true);
        }]
      }
    });
  }]);
})();