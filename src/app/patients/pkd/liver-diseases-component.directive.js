import templateUrl from './liver-diseases-component.html';

function liverDiseasesPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

liverDiseasesPermissionFactory.$inject = ['PatientObjectPermission'];

function liverDiseasesControllerFactory(
  ModelDetailController,
  LiverDiseasesPermission,
  $injector,
  store
) {
  function LiverDiseasesController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new LiverDiseasesPermission($scope.patient)
      }
    });

    self.load(store.findFirst('liver-diseases', {patient: $scope.patient.id})).then(function() {
      self.view();
    });

    $scope.create = function() {
      var item = store.create('liver-diseases', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  LiverDiseasesController.$inject = ['$scope'];
  LiverDiseasesController.prototype = Object.create(ModelDetailController.prototype);

  return LiverDiseasesController;
}

liverDiseasesControllerFactory.$inject = [
  'ModelDetailController',
  'LiverDiseasesPermission',
  '$injector',
  'store'
];

function liverDiseasesComponent(LiverDiseasesController) {
  return {
    scope: {
      patient: '='
    },
    controller: LiverDiseasesController,
    templateUrl: templateUrl
  };
}

liverDiseasesComponent.$inject = ['LiverDiseasesController'];

export {
  liverDiseasesPermissionFactory,
  liverDiseasesControllerFactory,
  liverDiseasesComponent
};
