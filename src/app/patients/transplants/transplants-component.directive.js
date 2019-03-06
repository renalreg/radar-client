import templateUrl from './transplants-component.html';

function transplantPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

transplantPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function transplantsControllerFactory(
  ModelListDetailController,
  TransplantPermission,
  firstPromise,
  $injector,
  store
) {
  /**
   * A component for viewing and entering a patient's transplants.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function TransplantsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new TransplantPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('transplants', {patient: $scope.patient.id}),
      store.findMany('transplant-modalities').then(function(modalities) {
        $scope.modalities = modalities;
      }),
      store.findMany('transplant-graft-loss-causes').then(function(graftLossCauses) {
        $scope.graftLossCauses = graftLossCauses;
      })
    ]));

    $scope.create = function() {
      var item = store.create('transplants', {patient: $scope.patient.id});
      item.params = {'isTransplantCentre': true};
      self.edit(item);
    };

    $scope.edit = function(item) {
      item.params = {'isTransplantCentre': true};
      self.edit(item);
    };
  }

  TransplantsController.$inject = ['$scope'];
  TransplantsController.prototype = Object.create(ModelListDetailController.prototype);

  return TransplantsController;
}

transplantsControllerFactory.$inject = [
  'ModelListDetailController',
  'TransplantPermission',
  'firstPromise',
  '$injector',
  'store'
];

function transplantsComponent(TransplantsController) {
  return {
    scope: {
      patient: '='
    },
    controller: TransplantsController,
    templateUrl: templateUrl
  };
}

transplantsComponent.$inject = ['TransplantsController'];

export {
  transplantPermissionFactory,
  transplantsControllerFactory,
  transplantsComponent
};
