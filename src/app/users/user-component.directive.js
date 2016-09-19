import templateUrl from './user-component.html';

function userPermissionFactory(hasPermissionForUser, session) {
  function UserPermission() {
  }

  UserPermission.prototype.hasPermission = function() {
    return true;
  };

  UserPermission.prototype.hasObjectPermission = function(obj) {
    return (
      obj.id !== session.user.id && // separate forms for changing your own details
      hasPermissionForUser(session.user, obj, 'EDIT_USER')
    );
  };

  return UserPermission;
}

userPermissionFactory.$inject = ['hasPermissionForUser', 'session'];

function userControllerFactory(
  ModelDetailController, $injector, UserPermission, DenyPermission, session
) {
  function UserController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        createPermission: new DenyPermission(),
        editPermission: new UserPermission(),
        removePermission: new DenyPermission(),
      }
    });

    $scope.currentUser = session.user;

    self.load($scope.user).then(function() {
      self.view();
    });
  }

  UserController.$inject = ['$scope'];
  UserController.prototype = Object.create(ModelDetailController.prototype);

  UserController.prototype.save = function() {
    // If the password is blank don't update it
    if (!this.scope.item.password) {
      this.scope.item.password = undefined;
    }

    return ModelDetailController.prototype.save.call(this);
  };

  return UserController;
}

userControllerFactory.$inject = [
  'ModelDetailController', '$injector', 'UserPermission', 'DenyPermission', 'session'
];

function userComponent(UserController) {
  return {
    scope: {
      user: '='
    },
    controller: UserController,
    templateUrl: templateUrl
  };
}

userComponent.$inject = ['UserController'];

export {
  userPermissionFactory,
  userControllerFactory,
  userComponent
};
