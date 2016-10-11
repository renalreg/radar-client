import angular from 'angular';

import diagnosisModelFactory from './diagnosis-model';

function config(storeProvider) {
  storeProvider.registerModel('diagnoses', 'DiagnosisModel');
}

config.$inject = ['storeProvider'];

export default angular.module('radar.diagnoses', [])
  .config(config)
  .factory('DiagnosisModel', diagnosisModelFactory)
  .name;
