import templateUrl from './demographics-component.html';

function patientDemographicsPermissionFactory(PatientRadarObjectPermission) {
  return PatientRadarObjectPermission;
}

patientDemographicsPermissionFactory.$inject = ['PatientRadarObjectPermission'];

function patientDemographicsControllerFactory(
  ModelListDetailController,
  PatientDemographicsPermission,
  firstPromise,
  DenyPermission,
  $injector,
  store
) {
  function PatientDemographicsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        createPermission: new DenyPermission(),
        editPermission: new PatientDemographicsPermission($scope.patient),
        removePermission: new DenyPermission()
      }
    });

    self.load(firstPromise([
      store.findMany('patient-demographics', {patient: $scope.patient.id}),
      store.findMany('genders').then(function(genders) {
        $scope.genders = genders;
      }),
      store.findMany('ethnicities').then(function(ethnicities) {
        $scope.ethnicities = ethnicities;
      })
    ]));
  }

  PatientDemographicsController.$inject = ['$scope'];
  PatientDemographicsController.prototype = Object.create(ModelListDetailController.prototype);

  PatientDemographicsController.prototype.save = function() {
    var self = this;

    return ModelListDetailController.prototype.save.call(self).then(function() {
      // Reload the patient with the latest demographics
      self.scope.patient.reload();
    });
  };

  return PatientDemographicsController;
}

patientDemographicsControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientDemographicsPermission',
  'firstPromise',
  'DenyPermission',
  '$injector',
  'store'
];

function patientDemographicsComponent(PatientDemographicsController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientDemographicsController,
    templateUrl: templateUrl
  };
}

patientDemographicsComponent.$inject = ['PatientDemographicsController'];

export {
  patientDemographicsPermissionFactory,
  patientDemographicsControllerFactory,
  patientDemographicsComponent
};
