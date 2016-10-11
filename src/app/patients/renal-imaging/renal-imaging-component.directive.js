import templateUrl from './renal-imaging-component.html';

function renalImagingPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

renalImagingPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function renalImagingControllerFactory(
  ModelListDetailController,
  RenalImagingPermission,
  firstPromise,
  $injector,
  store
) {
  /**
   * A component for recording a patient's renal imaging results (e.g. ultrasound).
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function RenalImagingController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new RenalImagingPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('renal-imaging', {patient: $scope.patient.id}),
      store.findMany('renal-imaging-types').then(function(imagingTypes) {
        $scope.imagingTypes = imagingTypes;
      }),
      store.findMany('renal-imaging-kidney-types').then(function(kidneyTypes) {
        $scope.kidneyTypes = kidneyTypes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('renal-imaging', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  RenalImagingController.$inject = ['$scope'];
  RenalImagingController.prototype = Object.create(ModelListDetailController.prototype);

  return RenalImagingController;
}

renalImagingControllerFactory.$inject = [
  'ModelListDetailController',
  'RenalImagingPermission',
  'firstPromise',
  '$injector',
  'store'
];

function renalImagingComponent(RenalImagingController) {
  return {
    scope: {
      patient: '='
    },
    controller: RenalImagingController,
    templateUrl: templateUrl
  };
}

renalImagingComponent.$inject = ['RenalImagingController'];

export {
  renalImagingPermissionFactory,
  renalImagingControllerFactory,
  renalImagingComponent
};
