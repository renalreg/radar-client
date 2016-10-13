import sortGroups from '../groups/sort-groups';

import templateUrl from './navbar.html';

function navbar(session, hasPermission, systemStore) {
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

      scope.$watch(function() {
        return session.isAuthenticated;
      }, function(isAuthenticated) {
        if (isAuthenticated) {
          load();
        }
      });

      function load() {
        systemStore.getAll().then(function(systems) {
          scope.systems = sortGroups(systems);
        });
      }
    }
  };
}

navbar.$inject = ['session', 'hasPermission', 'systemStore'];

export default navbar;
