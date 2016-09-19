import templateUrl from './diagnoses-component.html';

function diagnosisPermissionFactory(AdminPermission) {
  return AdminPermission;
}

diagnosisPermissionFactory.$inject = ['AdminPermission'];

function diagnosesControllerFactory(
  ModelListDetailController,
  DiagnosisPermission,
  $injector,
  store
) {
  function DiagnosesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new DiagnosisPermission($scope.patient)
      }
    });

    self.load(store.findMany('diagnoses'));

    $scope.create = function() {
      var item = store.create('diagnoses', {groups: []});
      self.edit(item);
    };
  }

  DiagnosesController.$inject = ['$scope'];
  DiagnosesController.prototype = Object.create(ModelListDetailController.prototype);

  return DiagnosesController;
}

diagnosesControllerFactory.$inject = [
  'ModelListDetailController',
  'DiagnosisPermission',
  '$injector',
  'store'
];

function diagnosesComponent(DiagnosesController) {
  return {
    controller: DiagnosesController,
    templateUrl: templateUrl
  };
}

diagnosesComponent.$inject = ['DiagnosesController'];

export {
  diagnosisPermissionFactory,
  diagnosesControllerFactory,
  diagnosesComponent
};
