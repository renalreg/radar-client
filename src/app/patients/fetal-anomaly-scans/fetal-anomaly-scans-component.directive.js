import templateUrl from './fetal-anomaly-scans-component.html';

function fetalAnomalyScanPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

fetalAnomalyScanPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function fetalAnomalyScansControllerFactory(
  ModelListDetailController,
  FetalAnomalyScanPermission,
  $injector,
  store
) {
  function FetalAnomalyScansController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new FetalAnomalyScanPermission($scope.patient)
      }
    });

    self.load(
      store.findMany('fetal-anomaly-scans', {patient: $scope.patient.id}),
      store.findMany('fetal-anomaly-imaging-types').then(function(imagingTypes) {
        $scope.imagingTypes = imagingTypes;
    }));

    $scope.create = function() {
      var item = store.create('fetal-anomaly-scans', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  FetalAnomalyScansController.$inject = ['$scope'];
  FetalAnomalyScansController.prototype = Object.create(ModelListDetailController.prototype);

  return FetalAnomalyScansController;
}

fetalAnomalyScansControllerFactory.$inject = [
  'ModelListDetailController',
  'FetalAnomalyScanPermission',
  '$injector',
  'store'
];

function fetalAnomalyScansComponent(FetalAnomalyScansController) {
  return {
    scope: {
      patient: '='
    },
    controller: FetalAnomalyScansController,
    templateUrl: templateUrl
  };
}

fetalAnomalyScansComponent.$inject = ['FetalAnomalyScansController'];

export {
  fetalAnomalyScanPermissionFactory,
  fetalAnomalyScansControllerFactory,
  fetalAnomalyScansComponent
};
