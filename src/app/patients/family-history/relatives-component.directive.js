import templateUrl from './relatives-component.html';

function familyHistoryRelativesControllerFactory(
  ListEditController,
  $injector,
  firstPromise,
  store
) {
  function FamilyHistoryRelativesController($scope) {
    $injector.invoke(ListEditController, this, {$scope: $scope, params: {}});

    this.load(firstPromise([
      $scope.parent.relatives,
      store.findMany('family-history-relationships').then(function(relationships) {
        $scope.relationships = relationships;
      })
    ]));

    $scope.create = function() {
      // Create a new relative
      $scope.parent.relatives.push({});
    };
  }

  FamilyHistoryRelativesController.$inject = ['$scope'];
  FamilyHistoryRelativesController.prototype = Object.create(ListEditController.prototype);

  return FamilyHistoryRelativesController;
}

familyHistoryRelativesControllerFactory.$inject = [
  'ListEditController',
  '$injector',
  'firstPromise',
  'store'
];

function familyHistoryRelativesComponent(FamilyHistoryRelativesController) {
  return {
    scope: {
      parent: '=familyHistory'
    },
    controller: FamilyHistoryRelativesController,
    templateUrl: templateUrl
  };
}

familyHistoryRelativesComponent.$inject = ['FamilyHistoryRelativesController'];

export {
  familyHistoryRelativesControllerFactory,
  familyHistoryRelativesComponent
};
