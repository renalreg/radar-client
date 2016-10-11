import templateUrl from './biopsies-component.html';

function transplantBiopsiesControllerFactory(
  ListEditController,
  $injector
) {
  function TransplantBiopsiesController($scope) {
    $injector.invoke(ListEditController, this, {$scope: $scope, params: {}});
    this.load($scope.parent.biopsies);

    $scope.create = function() {
      // Create a new biopsy
      $scope.parent.biopsies.push({});
    };
  }

  TransplantBiopsiesController.$inject = ['$scope'];
  TransplantBiopsiesController.prototype = Object.create(ListEditController.prototype);

  return TransplantBiopsiesController;
}

transplantBiopsiesControllerFactory.$inject = [
  'ListEditController',
  '$injector'
];

function transplantBiopsiesComponent(TransplantBiopsiesController) {
  return {
    scope: {
      parent: '=transplant'
    },
    controller: TransplantBiopsiesController,
    templateUrl: templateUrl
  };
}

transplantBiopsiesComponent.$inject = ['TransplantBiopsiesController'];

export {
  transplantBiopsiesControllerFactory,
  transplantBiopsiesComponent
};
