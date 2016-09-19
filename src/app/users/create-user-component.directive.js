import templateUrl from './create-user-component.html';

function createUserControllerFactory(ModelEditController, $injector, store, $state) {
  function CreateUserController($scope) {
    var self = this;

    $injector.invoke(ModelEditController, self, {
      $scope: $scope,
      params: {}
    });

    self.load(store.create('users', {
      isAdmin: false,
      forcePasswordChange: true
    }));
  }

  CreateUserController.$inject = ['$scope'];
  CreateUserController.prototype = Object.create(ModelEditController.prototype);

  CreateUserController.prototype.save = function() {
    return ModelEditController.prototype.save.call(this).then(function(user) {
      $state.go('user', {userId: user.id});
    });
  };

  return CreateUserController;
}

createUserControllerFactory.$inject = ['ModelEditController', '$injector', 'store', 'state'];

function createUserComponent(CreateUserController) {
  return {
    scope: {},
    controller: CreateUserController,
    templateUrl: templateUrl
  };
}

createUserComponent.$inject = ['CreateUserController'];

export {
  createUserControllerFactory,
  createUserComponent
};
