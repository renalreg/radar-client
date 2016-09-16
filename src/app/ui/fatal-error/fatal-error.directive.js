import _ from 'lodash';

import templateUrl from './fatal-error.html';

function fatalError($window, notificationService) {
  return {
    templateUrl: templateUrl,
    link: function(scope) {
      scope.notification = null;

      scope.reload = function() {
        $window.location.reload();
      };

      scope.close = function() {
        scope.notification.remove();
      };

      scope.$watchCollection(function() {
        return notificationService.notifications;
      }, function(notifications) {
        scope.notification = _.find(notifications, function(notification) {
          return notification.type === 'fatal';
        });
      });
    }
  };
}

fatalError.$inject = ['$window', 'notificationService'];

export default fatalError;
