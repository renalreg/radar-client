(function() {
  'use strict';

  var app = angular.module('radar.users.groups');

  app.factory('getGroupRoles', ['session', '_', '$q', 'store', function(session, _, $q, store) {
    function sort(groupRoles) {
      return _.sortBy(groupRoles, ['group.type', 'group.name']);
    }

    return function() {
      var deferred = $q.defer();

      var user = session.user;

      if (user.isAdmin) {
        $q.all([
          store.findMany('groups'),
          store.findMany('roles')
        ]).then(function(results) {
          var groups = results[0];
          var roles = results[1];

          var groupRoles = _.map(groups, function(group) {
            return {
              group: group,
              roles: roles,
            };
          });

          groupRoles = sort(groupRoles);

          deferred.resolve(groupRoles);
        });
      } else {
        var groupRoles = _.map(user.groups, function(x) {
          return {
            group: x.group,
            roles: x.managedRoles
          };
        });

        groupRoles = _.filter(groupRoles, function(groupRole) {
          return groupRole.roles.length > 0;
        });

        groupRoles = sort(groupRoles);

        deferred.resolve(groupRoles);
      }

      return deferred.promise;
    };
  }]);
})();
