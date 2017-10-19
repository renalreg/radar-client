import templateUrl from './consents-component.html';

function patientConsentPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

patientConsentPermissionFactory.$inject = ['PatientObjectPermission'];

function patientConsentsControllerFactory(
  ModelListDetailController,
  PatientConsentPermission,
  firstPromise,
  $injector,
  store
) {
  /**
   * This component is for recording the patient's consents.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientConsentsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientConsentPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('patient-consents', {patient: $scope.patient.id}),
      store.findMany('consents', {patient: $scope.patient.id}).then(function(consents) {
        $scope.consents = consents;
      })
    ]));

    $scope.create = function() {
      var item = store.create('patient-consents', {patient: $scope.patient.id});
      item.signedOnDate = new Date().toISOString();
      self.edit(item);
    };

  }

  PatientConsentsController.$inject = ['$scope'];
  PatientConsentsController.prototype = Object.create(ModelListDetailController.prototype);

  return PatientConsentsController;
}

patientConsentsControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientConsentPermission',
  'firstPromise',
  '$injector',
  'store'
];

function patientConsentsComponent(PatientConsentsController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientConsentsController,
    templateUrl: templateUrl
  };
}

patientConsentsComponent.$inject = ['PatientConsentsController'];

export {
  patientConsentPermissionFactory,
  patientConsentsControllerFactory,
  patientConsentsComponent
};
