import templateUrl from './diagnoses-component.html';

function patientDiagnosesControllerFactory(
  ModelListDetailController,
  PatientDiagnosisPermission,
  $injector,
  store
) {
  /**
   * This component is for recording the patient's comorbidities. There is a separate component
   * for recording the patient's primary diagnose(s). A patient may have multiple comorbities
   * at any one time and may lose and regain comorbidites over time.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientDiagnosesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientDiagnosisPermission($scope.patient)
      }
    });

    // Fetch a list of diagnoses excluding any diagnosis that can also be a primary diagnosis
    // for this patient - these are entered on the primary diagnosis page instead.
    self.load(store.findMany('patient-diagnoses', {patient: $scope.patient.id, includePrimary: false}));

    $scope.create = function() {
      // Default to the patient having the diagnosis ("the patient has anxiety" rather than "the
      // patient does not have anxiety").
      var item = store.create('patient-diagnoses', {
        patient: $scope.patient.id,
        status: true
      });

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
