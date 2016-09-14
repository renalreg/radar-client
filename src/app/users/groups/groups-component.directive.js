import _ from 'lodash';

import templateUrl from './groups-component.html';

function userGroupPermissionFactory(hasPermission, hasPermissionForGroup, session) {
  function UserGroupPermission() {
  }

  UserGroupPermission.prototype.hasPermission = function() {
    return hasPermission(session.user, 'EDIT_USER_MEMBERSHIP');
  };

  UserGroupPermission.prototype.hasObjectPermission = function(obj) {
    return hasPermissionForGroup(session.user, obj.group, 'EDIT_USER_MEMBERSHIP');
  };

  return UserGroupPermission;
}

userGroupPermissionFactory.$inject = ['hasPermission', 'hasPermissionForGroup', 'session'];

function userGroupsControllerFactory(
  ModelListDetailController,
  $injector,
  store,
  firstPromise,
  UserGroupPermission,
  getGroupRoles
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

userGroupsControllerFactory.$inject = [
  'ModelListDetailController',
  '$injector',
  'store',
  'firstPromise',
  'UserGroupPermission',
  'getGroupRoles'
];

function userGroupsComponent(UserGroupsController) {
  return {
    scope: {
      user: '='
    },
    controller: UserGroupsController,
    templateUrl: templateUrl
  };
}

userGroupsComponent.$inject = ['UserGroupsController'];

export {
  userGroupPermissionFactory,
  userGroupsControllerFactory,
  userGroupsComponent
};
