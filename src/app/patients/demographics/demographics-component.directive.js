import templateUrl from './demographics-component.html';

function patientDemographicsPermissionFactory(PatientSystemObjectPermission) {
  return PatientSystemObjectPermission;
}

patientDemographicsPermissionFactory.$inject = [
  'PatientSystemObjectPermission',
];

function patientDemographicsControllerFactory(
  ModelListDetailController,
  PatientDemographicsPermission,
  firstPromise,
  DenyPermission,
  $injector,
  store
) {
  /**
   * Each patient has a demographics record which includes PID like their name, date of birth
   * and ethnicity. A patient can have at most one demographics record per source (e.g. RADAR
   * and UKRDC).
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientDemographicsController($scope) {
    var self = this;

    // When a patient is recruited an entry is created in the demographics table with the
    // patient's name etc. This entry can be edited but not deleted. There should only be
    // one entry per patient (and source). Therefore users shouldn't be allowed to create new
    // entries.

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        createPermission: new DenyPermission(),
        editPermission: new PatientDemographicsPermission($scope.patient),
        removePermission: new DenyPermission(),
      },
    });

    self.load(
      firstPromise([
        store.findMany('patient-demographics', { patient: $scope.patient.id }),
        store.findMany('genders').then(function (genders) {
          $scope.genders = genders;
        }),
        store
          .findMany('ethnicities', { patient: $scope.patient.id })
          .then(function (ethnicities) {
            $scope.ethnicities = ethnicities;
          }),
        store
          .findMany('nationalities', { patient: $scope.patient.id })
          .then(function (nationalities) {
            $scope.nationalities = nationalities;
          }),
      ])
    );
  }

  PatientDemographicsController.$inject = ['$scope'];
  PatientDemographicsController.prototype = Object.create(
    ModelListDetailController.prototype
  );

  /**
   * Called when the demographics are saved.
   *
   * @returns {Object} - a promise.
   */
  PatientDemographicsController.prototype.save = function () {
    var self = this;

    return ModelListDetailController.prototype.save
      .call(self)
      .then(function () {
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
  'store',
];

function patientDemographicsComponent(PatientDemographicsController) {
  return {
    scope: {
      patient: '=',
    },
    controller: PatientDemographicsController,
    templateUrl: templateUrl,
  };
}

patientDemographicsComponent.$inject = ['PatientDemographicsController'];

export {
  patientDemographicsPermissionFactory,
  patientDemographicsControllerFactory,
  patientDemographicsComponent,
};
