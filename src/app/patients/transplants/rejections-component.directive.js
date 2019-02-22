import templateUrl from './rejections-component.html';

function transplantRejectionsControllerFactory(
  ListEditController,
  firstPromise,
  $injector,
  store
) {
  function TransplantRejectionsController($scope) {
    var self = this;

    $injector.invoke(ListEditController, self, {$scope: $scope, params: {}});

    self.load(firstPromise([
      $scope.parent.rejections,
      store.findMany('transplant-graft-loss-causes').then(function(graftLossCauses) {
        $scope.graftLossCauses = graftLossCauses;
      })
    ]));

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
  'firstPromise',
  '$injector',
  'store'
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
