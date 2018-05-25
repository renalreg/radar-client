import templateUrl from './relapses-component.html';

function insRelapsePermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

insRelapsePermissionFactory.$inject = ['PatientObjectPermission'];

function insRelapsesControllerFactory(
  ModelListDetailController,
  InsRelapsePermission,
  firstPromise,
  $injector,
  store
) {
  function InsRelapsesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new InsRelapsePermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('ins-relapses', {patient: $scope.patient.id}),
      store.findMany('ins-kidney-types').then(function(kidneyTypes) {
        $scope.kidneyTypes = kidneyTypes;
      }),
      store.findMany('ins-dipstick-options').then(function(dipstickOptions) {
        $scope.dipstickOptions = dipstickOptions;
      }),
      store.findMany('ins-remission-types').then(function(remissionTypes) {
        $scope.remissionTypes = remissionTypes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('ins-relapses', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  InsRelapsesController.$inject = ['$scope'];
  InsRelapsesController.prototype = Object.create(ModelListDetailController.prototype);

  return InsRelapsesController;
}

insRelapsesControllerFactory.$inject = [
  'ModelListDetailController',
  'InsRelapsePermission',
  'firstPromise',
  '$injector',
  'store'
];

function insRelapsesComponent(InsRelapsesController) {
  return {
    scope: {
      patient: '='
    },
    controller: InsRelapsesController,
    templateUrl: templateUrl
  };
}

insRelapsesComponent.$inject = ['InsRelapsesController'];

export {
  insRelapsePermissionFactory,
  insRelapsesControllerFactory,
  insRelapsesComponent
};
