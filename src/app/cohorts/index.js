import angular from 'angular';
import uiRouter from 'angular-ui-router';

import stats from '../stats';
import store from '../store';

import CohortDetailController from './cohort-detail.controller';
import CohortListController from './cohort-list.controller';
import cohortStore from './cohort-store';
import sortCohorts from './sort-cohorts';

import cohortListTemplateUrl from './cohort-list.html';
import cohortDetailTemplateUrl from './cohort-detail.html';

function config($stateProvider) {
  $stateProvider.state('cohorts', {
    url: '/cohorts',
    templateUrl: cohortListTemplateUrl,
    controller: 'CohortListController'
  });

  $stateProvider.state('cohort', {
    url: '/cohorts/:cohortId',
    templateUrl: cohortDetailTemplateUrl,
    controller: 'CohortDetailController',
    resolve: {
      cohort: ['$stateParams', 'cohortStore', function($stateParams, cohortStore, $q) {
        return cohortStore.findOne($stateParams.cohortId);
      }]
    }
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.cohorts', [uiRouter, stats, store])
  .config(config)
  .controller('CohortDetailController', CohortDetailController)
  .controller('CohortListController', CohortListController)
  .factory('cohortStore', cohortStore)
  .factory('sortCohorts', sortCohorts)
  .name;