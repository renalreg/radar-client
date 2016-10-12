import templateUrl from './plasmapheresis-component.html';

function plasmapheresisPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

plasmapheresisPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function plasmapheresisControllerFactory(
  ModelListDetailController,
  PlasmapheresisPermission,
  firstPromise,
  $injector,
  store
) {
  /**
   * A component for recording a patients plasmapheresis treatments.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PlasmapheresisController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PlasmapheresisPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('plasmapheresis', {patient: $scope.patient.id}),
      store.findMany('plasmapheresis-responses').then(function(responses) {
        $scope.responses = responses;
      }),
      store.findMany('plasmapheresis-no-of-exchanges').then(function(noOfExchanges) {
        $scope.noOfExchanges = noOfExchanges;
      })
    ]));

    $scope.create = function() {
      var item = store.create('plasmapheresis', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  PlasmapheresisController.$inject = ['$scope'];
  PlasmapheresisController.prototype = Object.create(ModelListDetailController.prototype);

  return PlasmapheresisController;
}

plasmapheresisControllerFactory.$inject = [
  'ModelListDetailController',
  'PlasmapheresisPermission',
  'firstPromise',
  '$injector',
  'store'
];

function plasmapheresisComponent(PlasmapheresisController) {
  return {
    scope: {
      patient: '='
    },
    controller: PlasmapheresisController,
    templateUrl: templateUrl
  };
}

plasmapheresisComponent.$inject = ['PlasmapheresisController'];

export {
  plasmapheresisPermissionFactory,
  plasmapheresisControllerFactory,
  plasmapheresisComponent
};
