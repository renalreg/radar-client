import templateUrl from './nephrectomies-component.html';

function nephrectomyPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

nephrectomyPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function nephrectomiesControllerFactory(
  ModelListDetailController,
  NephrectomyPermission,
  firstPromise,
  $injector,
  store
) {
  function NephrectomiesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new NephrectomyPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('nephrectomies', {patient: $scope.patient.id}),
      store.findMany('nephrectomy-kidney-sides').then(function(kidneySides) {
        $scope.kidneySides = kidneySides;
      }),
      store.findMany('nephrectomy-kidney-types').then(function(kidneyTypes) {
        $scope.kidneyTypes = kidneyTypes;
      }),
      store.findMany('nephrectomy-entry-types').then(function(entryTypes) {
        $scope.entryTypes = entryTypes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('nephrectomies', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  NephrectomiesController.$inject = ['$scope'];
  NephrectomiesController.prototype = Object.create(ModelListDetailController.prototype);

  return NephrectomiesController;
}

nephrectomiesControllerFactory.$inject = [
  'ModelListDetailController',
  'NephrectomyPermission',
  'firstPromise',
  '$injector',
  'store'
];

function nephrectomiesComponent(NephrectomiesController) {
  return {
    scope: {
      patient: '='
    },
    controller: NephrectomiesController,
    templateUrl: templateUrl
  };
}

nephrectomiesComponent.$inject = ['NephrectomiesController'];

export {
  nephrectomyPermissionFactory,
  nephrectomiesControllerFactory,
  nephrectomiesComponent
};
