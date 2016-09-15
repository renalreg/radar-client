import templateUrl from './clinical-pictures-component.html';

function alportClinicalPicturePermissionFactory(PatientObjectPermission) {
    return PatientObjectPermission;
}

alportClinicalPicturePermissionFactory.$inject = ['PatientObjectPermission'];

function alportClinicalPicturesControllerFactory(
  ModelListDetailController,
  AlportClinicalPicturePermission,
  firstPromise,
  $injector,
  store
) {
  function AlportClinicalPicturesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new AlportClinicalPicturePermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('alport-clinical-pictures', {patient: $scope.patient.id}),
      store.findMany('alport-deafness-options').then(function(deafnessOptions) {
        $scope.deafnessOptions = deafnessOptions;
      })
    ]));

    $scope.create = function() {
      var item = store.create('alport-clinical-pictures', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  AlportClinicalPicturesController.$inject = ['$scope'];
  AlportClinicalPicturesController.prototype = Object.create(ModelListDetailController.prototype);

  return AlportClinicalPicturesController;
}

alportClinicalPicturesControllerFactory.$inject = [
  'ModelListDetailController',
  'AlportClinicalPicturePermission',
  'firstPromise',
  '$injector',
  'store'
];

function alportClinicalPicturesComponent(AlportClinicalPicturesController) {
  return {
    scope: {
      patient: '='
    },
    controller: AlportClinicalPicturesController,
    templateUrl: templateUrl
  };
}

alportClinicalPicturesComponent.$inject = ['AlportClinicalPicturesController'];

export {
  alportClinicalPicturePermissionFactory,
  alportClinicalPicturesControllerFactory,
  alportClinicalPicturesComponent
};
