import templateUrl from './liver-imaging-component.html';

function liverImagingPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

liverImagingPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function liverImagingControllerFactory(
  ModelListDetailController,
  LiverImagingPermission,
  firstPromise,
  $injector,
  store
) {
  function LiverImagingController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new LiverImagingPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('liver-imaging', {patient: $scope.patient.id}),
      store.findMany('liver-imaging-types').then(function(imagingTypes) {
        $scope.imagingTypes = imagingTypes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('liver-imaging', {patient: $scope.patient.id, imagingType: $scope.imagingTypes[0]});
      self.edit(item);
    };
  }

  LiverImagingController.$inject = ['$scope'];
  LiverImagingController.prototype = Object.create(ModelListDetailController.prototype);

  return LiverImagingController;
}

liverImagingControllerFactory.$inject = [
  'ModelListDetailController',
  'LiverImagingPermission',
  'firstPromise',
  '$injector',
  'store'
];

function liverImagingComponent(LiverImagingController) {
  return {
    scope: {
      patient: '='
    },
    controller: LiverImagingController,
    templateUrl: templateUrl
  };
}

liverImagingComponent.$inject = ['LiverImagingController'];

export {
  liverImagingPermissionFactory,
  liverImagingControllerFactory,
  liverImagingComponent
};
