import angular from 'angular';

import sessionFactory from './session';
import sessionTimeoutService from './session-timeout-service';

export default angular.module('radar.sessions', [])
  .factory('session', sessionFactory)
  .factory('sessionTimeoutService', sessionTimeoutService)
  .name;
