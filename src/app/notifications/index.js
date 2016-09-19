import angular from 'angular';

import notificationService from './notification-service';
import notifications from './notifications.directive';

export default angular.module('radar.notifications', [])
  .factory('notificationService', notificationService)
  .directive('notifications', notifications)
  .name;