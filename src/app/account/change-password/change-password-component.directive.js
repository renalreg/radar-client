import templateUrl from './change-password-component.html';

function changePasswordControllerFactory(
  ModelEditController,
  $injector,
  notificationService
) {
  function ChangePasswordController($scope) {
    var self = this;

    $injector.invoke(ModelEditController, self, {
      $scope: $scope,
      params: {}
    });

    // Scratch space to confirmation of the password
    $scope.data = {};

    self.load($scope.user);
  }

  ChangePasswordController.$inject = ['$scope'];
  ChangePasswordController.prototype = Object.create(ModelEditController.prototype);

  ChangePasswordController.prototype.save = function() {
    var self = this;

    // Set the user's password
    self.scope.item.password = self.scope.data.password;

    // Unset force password change flag
    self.scope.item.forcePasswordChange = false;

    return ModelEditController.prototype.save.call(this).then(function() {
      notificationService.success('Your password has been updated.');

      // Reset the scratch space
      self.scope.data = {};
    });
  };

  return ChangePasswordController;
}

changePasswordControllerFactory.$inject = [
  'ModelEditController',
  '$injector',
  'notificationService'
];

function changePasswordComponent(ChangePasswordController) {
  return {
    scope: {
      user: '='
    },
    controller: ChangePasswordController,
    templateUrl: templateUrl
  };
}

changePasswordComponent.$inject = ['ChangePasswordController'];

export {
  changePasswordControllerFactory,
  changePasswordComponent
};
