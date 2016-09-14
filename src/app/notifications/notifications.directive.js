import templateUrl from './notifications.html';

var TYPE_TO_CLASS = {
  success: 'alert-success',
  fail: 'alert-danger',
  info: 'alert-info',
  warn: 'alert-warning',
  fatal: 'alert-danger',
};

function notifications(notificationService) {
  return {
    scope: {},
    templateUrl: templateUrl,
    link: function(scope) {
      scope.notifications = notificationService.notifications;

      scope.getClass = function(notification) {
        return TYPE_TO_CLASS[notification.type] || 'alert-info';
      };
    }
  };
}

notifications.$inject = ['notificationService'];

export default notifications;