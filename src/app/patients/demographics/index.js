import angular from 'angular';

import aliases from '../aliases';
import addresses from '../addresses';
import numbers from '../numbers';

import templateUrl from './demographics.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('patient-demographics', 'SourceModelMixin');

  $stateProvider.state('patient.demographics', {
    url: '',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.demographics', [aliases, addresses, numbers])
  .config(config)
  .name;
