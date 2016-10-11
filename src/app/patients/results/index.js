import angular from 'angular';

import observationListSelector from './observation-list-selector.directive';
import observationSelector from './observation-selector.directive';
import resultModelFactory from './result-model';
import {
  resultPermissionFactory,
  resultsControllerFactory,
  resultsComponent
} from './results-component.directive';
import resultsGraph from './results-graph.directive';

import templateUrl from './results.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('results', 'ResultModel');
  storeProvider.registerMixin('results', 'SourceModelMixin');

  $stateProvider.state('patient.results', {
    url: '/results',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.results', [])
  .config(config)
  .directive('observationListSelector', observationListSelector)
  .directive('observationSelector', observationSelector)
  .factory('ResultModel', resultModelFactory)
  .factory('ResultPermission', resultPermissionFactory)
  .factory('ResultsController', resultsControllerFactory)
  .directive('resultsComponent', resultsComponent)
  .directive('resultsGraph', resultsGraph)
  .name;
