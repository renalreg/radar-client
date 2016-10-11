import templateUrl from './pathology-component.html';

function pathologyPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

pathologyPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function pathologyControllerFactory(
  ModelListDetailController,
  PathologyPermission,
  firstPromise,
  $injector,
  store
) {
  /**
   * A component for recording a patient's pathology results.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PathologyController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PathologyPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('pathology', {patient: $scope.patient.id}),
      store.findMany('pathology-kidney-types').then(function(kidneyTypes) {
        $scope.kidneyTypes = kidneyTypes;
      }),
      store.findMany('pathology-kidney-sides').then(function(kidneySides) {
        $scope.kidneySides = kidneySides;
      })
    ]));

    $scope.create = function() {
      var item = store.create('pathology', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  PathologyController.$inject = ['$scope'];
  PathologyController.prototype = Object.create(ModelListDetailController.prototype);

  return PathologyController;
}

pathologyControllerFactory.$inject = [
  'ModelListDetailController',
  'PathologyPermission',
  'firstPromise',
  '$injector',
  'store'
];

function pathologyComponent(PathologyController) {
  return {
    scope: {
      patient: '='
    },
    controller: PathologyController,
    templateUrl: templateUrl
  };
}

pathologyComponent.$inject = ['PathologyController'];

export {
  pathologyPermissionFactory,
  pathologyControllerFactory,
  pathologyComponent
};
