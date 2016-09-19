import templateUrl from './consultants-component.html';

function patientConsultantPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

patientConsultantPermissionFactory.$inject = ['PatientObjectPermission'];

function patientConsultantsControllerFactory(
  ModelListDetailController,
  PatientConsultantPermission,
  firstPromise,
  $injector,
  store
) {
  function PatientConsultantsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientConsultantPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('patient-consultants', {patient: $scope.patient.id}),
      store.findMany('consultants', {patient: $scope.patient.id}).then(function(consultants) {
        $scope.consultants = consultants;
      })
    ]));

    $scope.create = function() {
      var item = store.create('patient-consultants', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  PatientConsultantsController.$inject = ['$scope'];
  PatientConsultantsController.prototype = Object.create(ModelListDetailController.prototype);

  return PatientConsultantsController;
}

patientConsultantsControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientConsultantPermission',
  'firstPromise',
  '$injector',
  'store'
];

function patientConsultantsComponent(PatientConsultantsController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientConsultantsController,
    templateUrl: templateUrl
  };
}

patientConsultantsComponent.$inject = ['PatientConsultantsController'];

export {
  patientConsultantPermissionFactory,
  patientConsultantsControllerFactory,
  patientConsultantsComponent
};
