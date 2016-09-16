import templateUrl from './diagnoses-component.html';

function patientDiagnosesControllerFactory(
  ModelListDetailController,
  PatientDiagnosisPermission,
  $injector,
  store
) {
  function PatientDiagnosesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientDiagnosisPermission($scope.patient)
      }
    });

    self.load(store.findMany('patient-diagnoses', {patient: $scope.patient.id, includePrimary: false}));

    $scope.create = function() {
      var item = store.create('patient-diagnoses', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  PatientDiagnosesController.$inject = ['$scope'];
  PatientDiagnosesController.prototype = Object.create(ModelListDetailController.prototype);

  return PatientDiagnosesController;
}

patientDiagnosesControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientDiagnosisPermission',
  '$injector',
  'store'
];

function patientDiagnosesComponent(PatientDiagnosesController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientDiagnosesController,
    templateUrl: templateUrl
  };
}

patientDiagnosesComponent.$inject = ['PatientDiagnosesController'];

export {
  patientDiagnosesControllerFactory,
  patientDiagnosesComponent
};
