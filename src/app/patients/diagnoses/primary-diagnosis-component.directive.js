import templateUrl from './primary-diagnosis-component.html';

function primaryPatientDiagnosisControllerFactory(
  ModelListDetailController,
  PatientDiagnosisPermission,
  firstPromise,
  $injector,
  store,
  getRadarGroup
) {
  function PrimaryPatientDiagnosisController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientDiagnosisPermission($scope.patient)
      }
    });

    // True if this cohort can have multiple primary diagnoses
    $scope.multiple = false;
    $scope.biopsyDiagnosis = false;

    self.load(firstPromise([
      // List of primary diagnoses for this cohort
      store.findMany('patient-diagnoses', {patient: $scope.patient.id, primaryGroup: $scope.cohort.id}),
      store.findMany('biopsy-diagnoses').then(function(biopsyDiagnoses) {
        $scope.biopsyDiagnoses = biopsyDiagnoses;
      }),
      getRadarGroup().then(function(group) {
        $scope.sourceGroup = group;
      })
    ])).then(function() {
      // TODO this won't handle a UKRDC primary diagnoses being entered before a RaDaR one
      var multiple = $scope.items.length > 1 || $scope.cohort.multipleDiagnoses;

      if ($scope.items.length === 0) { // No primary diagnoses entered
        // Create a new diagnosis if the user has permission, otherwise show
        // the empty list.
        if (self.createPermission()) {
          create();
        } else {
          self.list();
        }
      } else if (multiple) { // Multiple primary diagnoses allowed
        self.list();
      } else {
        self.view($scope.items[0]);
      }

      $scope.multiple = multiple;
      $scope.biopsyDiagnosis = $scope.cohort.code === 'INS' || $scope.cohort.code === 'INS-NEPHROS';
    });

    $scope.create = create;

    function create() {
      // Default the source group to RADAR
      var item = store.create('patient-diagnoses', {
        patient: $scope.patient.id,
        sourceGroup: $scope.sourceGroup
      });

      self.edit(item);
    }
  }

  PrimaryPatientDiagnosisController.$inject = ['$scope'];
  PrimaryPatientDiagnosisController.prototype = Object.create(ModelListDetailController.prototype);

  return PrimaryPatientDiagnosisController;
}

primaryPatientDiagnosisControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientDiagnosisPermission',
  'firstPromise',
  '$injector',
  'store',
  'getRadarGroup'
];

function primaryPatientDiagnosisComponent(PrimaryPatientDiagnosisController) {
  return {
    scope: {
      patient: '=',
      cohort: '='
    },
    controller: PrimaryPatientDiagnosisController,
    templateUrl: templateUrl
  };
}

primaryPatientDiagnosisComponent.$inject = ['PrimaryPatientDiagnosisController'];

export {
  primaryPatientDiagnosisControllerFactory,
  primaryPatientDiagnosisComponent
};
