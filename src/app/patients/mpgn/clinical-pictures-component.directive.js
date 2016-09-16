import templateUrl from './clinical-pictures-component.html';

function mpgnClinicalPicturePermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

mpgnClinicalPicturePermissionFactory.$inject = ['PatientObjectPermission'];

function mpgnClinicalPicturesControllerFactory(
  ModelListDetailController,
  MpgnClinicalPicturePermission,
  $injector,
  store
) {
  function MpgnClinicalPicturesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new MpgnClinicalPicturePermission($scope.patient)
      }
    });

    self.load(store.findMany('mpgn-clinical-pictures', {patient: $scope.patient.id}));

    $scope.create = function() {
      var item = store.create('mpgn-clinical-pictures', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  MpgnClinicalPicturesController.$inject = ['$scope'];
  MpgnClinicalPicturesController.prototype = Object.create(ModelListDetailController.prototype);

  return MpgnClinicalPicturesController;
}

mpgnClinicalPicturesControllerFactory.$inject = [
  'ModelListDetailController',
  'MpgnClinicalPicturePermission',
  '$injector',
  'store'
];

function mpgnClinicalPicturesComponent(MpgnClinicalPicturesController) {
  return {
    scope: {
      patient: '='
    },
    controller: MpgnClinicalPicturesController,
    templateUrl: templateUrl
  };
}

mpgnClinicalPicturesComponent.$inject = ['MpgnClinicalPicturesController'];

export {
  mpgnClinicalPicturePermissionFactory,
  mpgnClinicalPicturesControllerFactory,
  mpgnClinicalPicturesComponent
};
