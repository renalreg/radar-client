import templateUrl from './change-email-component.html';

function changeEmailControllerFactory(
  ModelEditController,
  $injector,
  notificationService
) {
  function ChangeEmailController($scope) {
    var self = this;

    $injector.invoke(ModelEditController, self, {
      $scope: $scope,
      params: {}
    });

    // Scratch space to store confirmation of the email
    $scope.data = {};

    self.load($scope.user);
  }

  ChangeEmailController.$inject = ['$scope'];
  ChangeEmailController.prototype = Object.create(ModelEditController.prototype);

  ChangeEmailController.prototype.save = function() {
    var self = this;

    // Set the user's email
    self.scope.item.email = self.scope.data.email;

    return ModelEditController.prototype.save.call(this).then(function() {
      notificationService.success('Your email has been updated.');

      // Reset the scratch space
      self.scope.data = {};
    });
  };

  return ChangeEmailController;
}

changeEmailControllerFactory.$inject = [
  'ModelEditController',
  '$injector',
  'notificationService'
];

function changeEmailComponent(ChangeEmailController) {
  return {
    scope: {
      user: '='
    },
    controller: ChangeEmailController,
    templateUrl: templateUrl
  };
}

changeEmailComponent.$inject = ['ChangeEmailController'];

export {
  changeEmailControllerFactory,
  changeEmailComponent
};
