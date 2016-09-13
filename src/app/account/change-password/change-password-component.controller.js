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

export default changePasswordControllerFactory;