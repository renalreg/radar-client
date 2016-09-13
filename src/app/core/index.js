import angular from 'angular';

import radarFactory from './radar';

export default angular.module('radar.core', [])
  .factory('radar', radarFactory)
  .name;
