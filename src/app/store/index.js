import angular from 'angular';

import utils from '../utils';

import adapterProvider from './adapter';
import errorResponseFactory from './error-response';
import forbiddenResponseFactory from './forbidden-response';
import lazyLoadFactory from './lazy-load';
import modelFactory from './model';
import storeProvider from './store';
import tokenRequestFactory from './token-request';
import tokenResponseFactory from './token-response';
import unauthorizedResponseFactory from './unauthorized-response';

function config(adapterProvider) {
  adapterProvider.beforeRequest('tokenRequest');
  adapterProvider.afterResponse('errorResponse');
  adapterProvider.afterResponse('forbiddenResponse');
  adapterProvider.afterResponse('tokenResponse');
  adapterProvider.afterResponse('unauthorizedResponse');
}

config.$inject = ['adapterProvider'];

export default angular.module('radar.store', [utils])
  .provider('adapter', adapterProvider)
  .provider('store', storeProvider)
  .config(config)
  .factory('errorResponse', errorResponseFactory)
  .factory('forbiddenResponse', forbiddenResponseFactory)
  .factory('lazyLoad', lazyLoadFactory)
  .factory('Model', modelFactory)
  .factory('tokenRequest', tokenRequestFactory)
  .factory('tokenResponse', tokenResponseFactory)
  .factory('unauthorizedResponse', unauthorizedResponseFactory)
  .name;
