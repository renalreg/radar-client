import templateUrl from './india-ethnicities-component.html';

function indiaEthnicityPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

indiaEthnicityPermissionFactory.$inject = ['PatientObjectPermission'];

function indiaEthnicitiesControllerFactory(
  ModelListDetailController,
  IndiaEthnicityPermission,
  firstPromise,
  getRadarGroup,
  $injector,
  store
) {
  /**
   * A component for India patients to record their extended demographics
   *
   * @class
   * @param {Object} $scope - angular scope
   */
  function IndiaEthnicitiesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new IndiaEthnicityPermission($scope.patient)
      }
    });

    $scope.sourceGroup = null;

    self.load(firstPromise([
      store.findMany('india-ethnicities', {patient: $scope.patient.id}),
      getRadarGroup().then(function(group) {
        $scope.sourceGroup = group;
      })
    ]));

    $scope.create = function() {
      var item = store.create('india-ethnicities', {
        patient: $scope.patient.id,
        sourceGroup: $scope.sourceGroup
      });
      self.edit(item);
    };
  }

  IndiaEthnicitiesController.$inject = ['$scope'];
  IndiaEthnicitiesController.prototype = Object.create(ModelListDetailController.prototype);

  return IndiaEthnicitiesController;
}

indiaEthnicitiesControllerFactory.$inject = [
  'ModelListDetailController',
  'IndiaEthnicityPermission',
  'firstPromise',
  'getRadarGroup',
  '$injector',
  'store'
];

function indiaEthnicitiesComponent(IndiaEthnicitiesController) {
  return{
    scope: {
      patient: '='
    },
    controller: IndiaEthnicitiesController,
    templateUrl: templateUrl
  };
}

indiaEthnicitiesComponent.$inject = ['IndiaEthnicitiesController'];

export {
  indiaEthnicitiesControllerFactory,
  indiaEthnicityPermissionFactory,
  indiaEthnicitiesComponent
};
