import templateUrl from './family-history-component.html';

function familyHistoryPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

familyHistoryPermissionFactory.$inject = ['PatientObjectPermission'];

function familyHistoryControllerFactory(
  ModelDetailController,
  FamilyHistoryPermission,
  $injector,
  store
) {
  function FamilyHistoryController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new FamilyHistoryPermission($scope.patient)
      }
    });

    self.load(store.findFirst('family-histories', {patient: $scope.patient.id, group: $scope.cohort.id})).then(function() {
      self.view();
    });

    $scope.create = function() {
      var item = store.create('family-histories', {patient: $scope.patient.id, group: $scope.cohort});
      self.edit(item);
    };
  }

  FamilyHistoryController.$inject = ['$scope'];
  FamilyHistoryController.prototype = Object.create(ModelDetailController.prototype);

  return FamilyHistoryController;
}

familyHistoryControllerFactory.$inject = [
  'ModelDetailController',
  'FamilyHistoryPermission',
  '$injector',
  'store'
];

function familyHistoryComponent(FamilyHistoryController) {
  return {
    scope: {
      patient: '=',
      cohort: '='
    },
    controller: FamilyHistoryController,
    templateUrl: templateUrl
  };
}

familyHistoryComponent.$inject = ['FamilyHistoryController'];

export {
  familyHistoryPermissionFactory,
  familyHistoryControllerFactory,
  familyHistoryComponent
};
