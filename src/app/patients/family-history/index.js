import angular from 'angular';

import templateUrl from './family-history.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('family-histories', 'FamilyHistoryModel');

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

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.familyHistory', [])
  .config(config)
  .name;
