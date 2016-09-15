import angular from 'angular';

import templateUrl from './family-history.html';

function config($stateProvider) {
  $stateProvider.state('patient.familyHistory', {
    url: '/family-history/:cohortId',
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

export default angular.module('radar.patients.familyHistory', [])
  .config(config)
  .name;
