import angular from 'angular';

import SystemStore from './system-store';

export default angular.module('radar.systems', [])
  .service('systemStore', SystemStore)
  .name;
