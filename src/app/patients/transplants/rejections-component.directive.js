import templateUrl from './rejections-component.html';

function transplantRejectionsControllerFactory(
  ListEditController,
  $injector
) {
  function TransplantRejectionsController($scope) {
    $injector.invoke(ListEditController, this, {$scope: $scope, params: {}});
    this.load($scope.parent.rejections);

    $scope.create = function() {
      // Create a new rejection
      $scope.parent.rejections.push({});
    };
  }

  TransplantRejectionsController.$inject = ['$scope'];
  TransplantRejectionsController.prototype = Object.create(ListEditController.prototype);

  return TransplantRejectionsController;
}

transplantRejectionsControllerFactory.$inject = [
  'ListEditController',
  '$injector'
];

function transplantRejectionsComponent(TransplantRejectionsController) {
  return {
    scope: {
      parent: '=transplant'
    },
    controller: TransplantRejectionsController,
    templateUrl: templateUrl
  };
}

transplantRejectionsComponent.$inject = ['TransplantRejectionsController'];

export {
  transplantRejectionsControllerFactory,
  transplantRejectionsComponent
};
