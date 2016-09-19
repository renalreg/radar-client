import templateUrl from './clinical-pictures-component.html';

function insClinicalPicturePermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

insClinicalPicturePermissionFactory.$inject = ['PatientObjectPermission'];

function insClinicalPicturesControllerFactory(
  ModelListDetailController,
  InsClinicalPicturePermission,
  $injector,
  store
) {
  function InsClinicalPicturesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new InsClinicalPicturePermission($scope.patient)
      }
    });

    self.load(store.findMany('ins-clinical-pictures', {patient: $scope.patient.id}));

    $scope.create = function() {
      var item = store.create('ins-clinical-pictures', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  InsClinicalPicturesController.$inject = ['$scope'];
  InsClinicalPicturesController.prototype = Object.create(ModelListDetailController.prototype);

  return InsClinicalPicturesController;
}

insClinicalPicturesControllerFactory.$inject = [
  'ModelListDetailController',
  'InsClinicalPicturePermission',
  '$injector',
  'store'
];

function insClinicalPicturesComponent(InsClinicalPicturesController) {
  return {
    scope: {
      patient: '='
    },
    controller: InsClinicalPicturesController,
    templateUrl: templateUrl
  };
}

insClinicalPicturesComponent.$inject = ['InsClinicalPicturesController'];

export {
  insClinicalPicturePermissionFactory,
  insClinicalPicturesControllerFactory,
  insClinicalPicturesComponent
};
