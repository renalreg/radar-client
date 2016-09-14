import templateUrl from './navbar.html';

function navbar(session, hasPermission) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: templateUrl,
    link: function(scope) {
      scope.$watch(function() {
        return session.user;
      }, function(user) {
        scope.showPatients = hasPermission(user, 'VIEW_PATIENT');
        scope.showUsers = hasPermission(user, 'VIEW_USER');
      });
    }
  };
}

navbar.$inject = ['session', 'hasPermission'];

export default navbar;
