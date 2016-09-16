import templateUrl from './clinical-pictures-component.html';

function fuanClinicalPicturePermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

fuanClinicalPicturePermissionFactory.$inject = ['PatientObjectPermission'];

function fuanClinicalPicturesControllerFactory(
  ModelListDetailController,
  FuanClinicalPicturePermission,
  $injector,
  store,
  firstPromise
) {
  function FuanClinicalPicturesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new FuanClinicalPicturePermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('fuan-clinical-pictures', {patient: $scope.patient.id}),
      store.findMany('fuan-relatives').then(function(relatives) {
        $scope.relatives = relatives;
      }),
      store.findMany('fuan-thp-results').then(function(thpResults) {
        $scope.thpResults = thpResults;
      })
    ]));

    $scope.create = function() {
      var item = store.create('fuan-clinical-pictures', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  FuanClinicalPicturesController.$inject = ['$scope'];
  FuanClinicalPicturesController.prototype = Object.create(ModelListDetailController.prototype);

  return FuanClinicalPicturesController;
}

fuanClinicalPicturesControllerFactory.$inject = [
  'ModelListDetailController',
  'FuanClinicalPicturePermission',
  '$injector',
  'store',
  'firstPromise'
];

function fuanClinicalPicturesComponent(FuanClinicalPicturesController) {
  return {
    scope: {
      patient: '='
    },
    controller: FuanClinicalPicturesController,
    templateUrl: templateUrl
  };
}

fuanClinicalPicturesComponent.$inject = ['FuanClinicalPicturesController'];

export {
  fuanClinicalPicturePermissionFactory,
  fuanClinicalPicturesControllerFactory,
  fuanClinicalPicturesComponent
};
