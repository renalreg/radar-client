import templateUrl from './dialysis-component.html';

function dialysisPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

dialysisPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function dialysisControllerFactory(
  ModelListDetailController,
  DialysisPermission,
  firstPromise,
  $injector,
  store
) {
  function DialysisController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new DialysisPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('dialysis', {patient: $scope.patient.id}),
      store.findMany('dialysis-modalities').then(function(modalities) {
        $scope.modalities = modalities;
      })
    ]));

    $scope.create = function() {
      var item = store.create('dialysis', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  DialysisController.$inject = ['$scope'];
  DialysisController.prototype = Object.create(ModelListDetailController.prototype);

  return DialysisController;
}

dialysisControllerFactory.$inject = [
  'ModelListDetailController',
  'DialysisPermission',
  'firstPromise',
  '$injector',
  'store'
];

function dialysisComponent(DialysisController) {
  return {
    scope: {
      patient: '='
    },
    controller: DialysisController,
    templateUrl: templateUrl
  };
}

export {
  dialysisPermissionFactory,
  dialysisControllerFactory,
  dialysisComponent
};
