import angular from 'angular';

import aliases from '../aliases';
import addresses from '../addresses';
import numbers from '../numbers';

import templateUrl from './demographics.html';

function config($stateProvider) {
  $stateProvider.state('patient.demographics', {
    url: '',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.demographics', [aliases, addresses, numbers])
  .config(config)
  .name;
