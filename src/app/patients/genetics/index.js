import angular from 'angular';

import templateUrl from './genetics.html';

function config($stateProvider) {
  $stateProvider.state('patient.genetics', {
    url: '/genetics/:cohortId',
    templateUrl: templateUrl,
    controller: ['$scope', 'cohort', function($scope, cohort) {
      $scope.cohort = cohort;
    }],
    resolve: {
      cohort: ['$stateParams', 'cohortStore', function($stateParams, cohortStore) {
        return cohortStore.findOne($stateParams.cohortId);
      }]
    }
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.genetics', [])
  .config(config)
  .name;
