import angular from 'angular';

import aliases from '../aliases';
import addresses from '../addresses';
import numbers from '../numbers';

import {
  patientDemographicsPermissionFactory,
  patientDemographicsControllerFactory,
  patientDemographicsComponent
} from './demographics-component.directive';

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
  .factory('PatientDemographicsPermission', patientDemographicsPermissionFactory)
  .factory('PatientDemographicsController', patientDemographicsControllerFactory)
  .directive('patientDemographicsComponent', patientDemographicsComponent)
  .name;
