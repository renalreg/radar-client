(function() {
  'use strict';

  var app = angular.module('radar.users.groups');

  app.factory('UserGroupPermission', ['hasPermission', 'hasPermissionForGroup', 'session', function(hasPermission, hasPermissionForGroup, session) {
    function UserGroupPermission() {
    }

    UserGroupPermission.prototype.hasPermission = function() {
      return hasPermission(session.user, 'EDIT_USER_MEMBERSHIP');
    };

    UserGroupPermission.prototype.hasObjectPermission = function(obj) {
      return hasPermissionForGroup(session.user, obj.group, 'EDIT_USER_MEMBERSHIP');
    };

    return UserGroupPermission;
  }]);



  function controllerFactory(
    ModelListDetailController,
    $injector,
    store,
    firstPromise,
    UserGroupPermission,
    getGroupRoles,
    _
  ) {
    function UserGroupsController($scope) {
      var self = this;

      $injector.invoke(ModelListDetailController, self, {
        $scope: $scope,
        params: {
          permission: new UserGroupPermission()
        }
      });

      self.load(firstPromise([
        $scope.user.groups,
        loadGroupRoles()
      ]));

      $scope.create = function() {
        self.edit(store.create('group-users', {user: $scope.user.id}));
      };

      $scope.groups = [];
      $scope.groupToRoles = {};

      $scope.getGroups = function() {
        return $scope.groups;
      };

      $scope.getRolesForGroup = function(group) {
        if (group) {
          return $scope.groupToRoles[group.id].roles;
        } else {
          return [];
        }
      };

      function loadGroupRoles() {
        return getGroupRoles().then(function(groupRoles) {
          $scope.groups = _.map(groupRoles, function(groupRole) {
            return groupRole.group;
          });
          $scope.groupToRoles = _.keyBy(groupRoles, 'group.id');
        });
      }
    }

    UserGroupsController.$inject = ['$scope'];
    UserGroupsController.prototype = Object.create(ModelListDetailController.prototype);

    return UserGroupsController;
  }

  controllerFactory.$inject = [
    'ModelListDetailController',
    '$injector',
    'store',
    'firstPromise',
    'UserGroupPermission',
    'getGroupRoles',
    '_'
  ];

  app.factory('UserGroupsController', controllerFactory);

  app.directive('userGroupsComponent', ['UserGroupsController', function(UserGroupsController) {
    return {
      scope: {
        user: '='
      },
      controller: UserGroupsController,
      templateUrl: 'app/users/groups/groups-component.html'
    };
  }]);
})();
