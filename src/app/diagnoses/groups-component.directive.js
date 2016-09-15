import templateUrl from './groups-component.html';

function diagnosisGroupsControllerFactory(
  ListEditController,
  $injector,
  firstPromise,
  store
) {
  function DiagnosisGroupsController($scope) {
    $injector.invoke(ListEditController, this, {$scope: $scope, params: {}});
    this.load(firstPromise([
      $scope.parent.groups,
      store.findMany('group-diagnosis-types').then(function(types) {
        $scope.types = types;
      })
    ]));

    $scope.create = function() {
      $scope.parent.groups.push({});
    };
  }

  DiagnosisGroupsController.$inject = ['$scope'];
  DiagnosisGroupsController.prototype = Object.create(ListEditController.prototype);

  return DiagnosisGroupsController;
}

diagnosisGroupsControllerFactory.$inject = [
  'ListEditController',
  '$injector',
  'firstPromise',
  'store'
];

function diagnosisGroupsComponent(DiagnosisGroupsController) {
  return {
    scope: {
      parent: '=diagnosis'
    },
    controller: DiagnosisGroupsController,
    templateUrl: templateUrl
  };
}

diagnosisGroupsComponent.$inject = ['DiagnosisGroupsController'];

export {
  diagnosisGroupsControllerFactory,
  diagnosisGroupsComponent
};
