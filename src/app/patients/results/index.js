import angular from 'angular';

import filterObservationsByNumeric from './filter-observations-by-numeric';
import filterResultsByObservations from './filter-results-by-observations';
import groupResults from './group-results';
import groupResultsByObservation from './group-results-by-observation';
import observationListSelector from './observation-list-selector.directive';
import observationSelector from './observation-selector.directive';
import resultModelFactory from './result-model';
import {
  resultPermissionFactory,
  resultsControllerFactory,
  resultsComponent
} from './results-component.directive';
import transformResultsForGraph from './transform-results-for-graph';
import transformResultsForTable from './transform-results-for-table';

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
  .factory('filterObservationsByNumeric', filterObservationsByNumeric)
  .factory('filterResultsByObservations', filterResultsByObservations)
  .factory('groupResults', groupResults)
  .factory('groupResultsByObservation', groupResultsByObservation)
  .directive('observationListSelector', observationListSelector)
  .directive('observationSelector', observationSelector)
  .factory('ResultModel', resultModelFactory)
  .factory('ResultPermission', resultPermissionFactory)
  .factory('ResultsController', resultsControllerFactory)
  .directive('ResultsComponent', resultsComponent)
  .factory('transformResultsForGraph', transformResultsForGraph)
  .factory('transformResultsForTable', transformResultsForTable)
  .name;
