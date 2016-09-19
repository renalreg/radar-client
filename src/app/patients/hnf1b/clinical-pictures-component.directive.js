import templateUrl from './clinical-pictures-component.html';

function hnf1bClinicalPicturePermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

hnf1bClinicalPicturePermissionFactory.$inject = ['PatientObjectPermission'];

function hnf1bClinicalPicturesControllerFactory(
  ModelListDetailController,
  Hnf1bClinicalPicturePermission,
  $injector,
  store
) {
  function Hnf1bClinicalPicturesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new Hnf1bClinicalPicturePermission($scope.patient)
      }
    });

    self.load(store.findMany('hnf1b-clinical-pictures', {patient: $scope.patient.id}));

    $scope.create = function() {
      var item = store.create('hnf1b-clinical-pictures', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  Hnf1bClinicalPicturesController.$inject = ['$scope'];
  Hnf1bClinicalPicturesController.prototype = Object.create(ModelListDetailController.prototype);

  return Hnf1bClinicalPicturesController;
}

hnf1bClinicalPicturesControllerFactory.$inject = [
  'ModelListDetailController',
  'Hnf1bClinicalPicturePermission',
  '$injector',
  'store'
];

function hnf1bClinicalPicturesComponent(Hnf1bClinicalPicturesController) {
  return {
    scope: {
      patient: '='
    },
    controller: Hnf1bClinicalPicturesController,
    templateUrl: templateUrl
  };
}

hnf1bClinicalPicturesComponent.$inject = ['Hnf1bClinicalPicturesController'];

export {
  hnf1bClinicalPicturePermissionFactory,
  hnf1bClinicalPicturesControllerFactory,
  hnf1bClinicalPicturesComponent
};
