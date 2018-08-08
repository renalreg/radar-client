import templateUrl from './criteria-component.html';

function rituximabCriteriaPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

rituximabCriteriaPermissionFactory.$inject = ['PatientObjectPermission'];

function rituximabCriteriaControllerFactory(
  ModelDetailController,
  RituximabCriteriaPermission,
  $injector,
  store
) {
  function RituximabCriteriaController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new RituximabCriteriaPermission($scope.patient)
      }
    });

    $scope.multiple = false;

    self.load(store.findFirst('rituximab-criteria', {patient: $scope.patient.id})).then(function() {
      self.view();
    });

    $scope.create = function() {
      var item = store.create('rituximab-criteria', {patient: $scope.patient.id});
      item.first = false;
      self.edit(item);
    };

  }

  RituximabCriteriaController.$inject = ['$scope'];
  RituximabCriteriaController.prototype = Object.create(ModelDetailController.prototype);

  return RituximabCriteriaController;
}

rituximabCriteriaControllerFactory.$inject = [
  'ModelDetailController',
  'RituximabCriteriaPermission',
  '$injector',
  'store'
];

function rituximabCriteriaComponent(RituximabCriteriaController) {
  return {
    scope: {
      patient: '='
    },
    controller: RituximabCriteriaController,
    templateUrl: templateUrl
  };
}

rituximabCriteriaComponent.$inject = ['RituximabCriteriaController'];

export {
  rituximabCriteriaPermissionFactory,
  rituximabCriteriaControllerFactory,
  rituximabCriteriaComponent
};
