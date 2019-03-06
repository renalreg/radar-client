import templateUrl from './numbers-component.html';

function patientNumberPermissionFactory(PatientSystemObjectPermission) {
  return PatientSystemObjectPermission;
}

patientNumberPermissionFactory.$inject = ['PatientSystemObjectPermission'];

function patientNumbersControllerFactory(
  ModelListDetailController,
  PatientNumberPermission,
  firstPromise,
  getRadarGroup,
  $injector,
  store,
  notificationService
) {
  /**
   * A component for recording patient numbers (e.g. NHS numbers, local hosptial numbers, and study numbers).
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientNumbersController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientNumberPermission($scope.patient)
      }
    });

    $scope.sourceGroup = null;

    self.load(firstPromise([
      store.findMany('patient-numbers', {patient: $scope.patient.id}),
      getRadarGroup().then(function(group) {
        $scope.sourceGroup = group;
      })
    ]));

    $scope.create = function() {
      var item = store.create('patient-numbers', {
        patient: $scope.patient.id,
        sourceGroup: $scope.sourceGroup
      });
      self.edit(item);
    };
  }

  PatientNumbersController.$inject = ['$scope'];
  PatientNumbersController.prototype = Object.create(ModelListDetailController.prototype);

  /**
   * A number was updated.
   *
   * @returns {Object} - a promise.
   */
  PatientNumbersController.prototype.save = function() {
    var self = this;

    return ModelListDetailController.prototype.save.call(self).then(function() {
      // Reload the patient incase the primary patient number has changed
      self.scope.patient.reload();
    });
  };

  /**
   * A number was removed.
   *
   * @param {Object} item - the item to remove.
   * @returns {Object} - a promise.
   */

  PatientNumbersController.prototype.remove = function(item) {
    var self = this;

    return ModelListDetailController.prototype.remove.call(self, item)
      .then(function() {
        // Reload the patient incase the primary patient number has changed
        self.scope.patient.reload();
      })
      .catch(function(response) {
        if (response && response.errors && response.errors.number) {
          notificationService.fail(response.errors.number);
        }
      });
  };

  return PatientNumbersController;
}

patientNumbersControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientNumberPermission',
  'firstPromise',
  'getRadarGroup',
  '$injector',
  'store',
  'notificationService'
];

function patientNumbersComponent(PatientNumbersController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientNumbersController,
    templateUrl: templateUrl
  };
}

patientNumbersComponent.$inject = ['PatientNumbersController'];

export {
  patientNumberPermissionFactory,
  patientNumbersControllerFactory,
  patientNumbersComponent
};
