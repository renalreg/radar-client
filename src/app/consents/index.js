import angular from 'angular';

import consentModelFactory from './consent-model';

function config(storeProvider) {
  storeProvider.registerModel('consents', 'ConsentModel');
}

config.$inject = ['storeProvider'];

export default angular.module('radar.consents', [])
  .config(config)
  .factory('ConsentModel', consentModelFactory)
  .name;
