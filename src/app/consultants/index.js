import angular from 'angular';

import consultantModelFactory from './consultant-model';

function config(storeProvider) {
  storeProvider.registerModel('consultants', 'ConsultantModel');
}

config.$inject = ['storeProvider'];

export default angular.module('radar.consultants', [])
  .config(config)
  .factory('ConsultantModel', consultantModelFactory)
  .name;
