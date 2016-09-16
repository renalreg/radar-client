import templateUrl from './fetal-ultrasounds-component.html';

function fetalUltrasoundPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

fetalUltrasoundPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function fetalUltrasoundsControllerFactory(
  ModelListDetailController,
  FetalUltrasoundPermission,
  firstPromise,
  $injector,
  store
) {
  function FetalUltrasoundsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new FetalUltrasoundPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('fetal-ultrasounds', {patient: $scope.patient.id}),
      store.findMany('fetal-ultrasound-liquor-volumes').then(function(liquorVolumes) {
        $scope.liquorVolumes = liquorVolumes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('fetal-ultrasounds', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  FetalUltrasoundsController.$inject = ['$scope'];
  FetalUltrasoundsController.prototype = Object.create(ModelListDetailController.prototype);

  return FetalUltrasoundsController;
}

fetalUltrasoundsControllerFactory.$inject = [
  'ModelListDetailController',
  'FetalUltrasoundPermission',
  'firstPromise',
  '$injector',
  'store'
];

function fetalUltrasoundsComponent(FetalUltrasoundsController) {
  return {
    scope: {
      patient: '='
    },
    controller: FetalUltrasoundsController,
    templateUrl: templateUrl
  };
}

fetalUltrasoundsComponent.$inject = ['FetalUltrasoundsController'];

export {
  fetalUltrasoundPermissionFactory,
  fetalUltrasoundsControllerFactory,
  fetalUltrasoundsComponent
};
