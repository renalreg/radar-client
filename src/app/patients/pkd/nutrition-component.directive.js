import templateUrl from './nutrition-component.html';

function nutritionPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

nutritionPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function nutritionControllerFactory(
  ModelListDetailController,
  NutritionPermission,
  firstPromise,
  $injector,
  store
) {
  function NutritionController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new NutritionPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('nutrition', {patient: $scope.patient.id}),
      store.findMany('nutrition-feeding-types').then(function(feedingTypes) {
        $scope.feedingTypes = feedingTypes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('nutrition', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  NutritionController.$inject = ['$scope'];
  NutritionController.prototype = Object.create(ModelListDetailController.prototype);

  return NutritionController;
}

nutritionControllerFactory.$inject = [
  'ModelListDetailController',
  'NutritionPermission',
  'firstPromise',
  '$injector',
  'store'
];

function nutritionComponent(NutritionController) {
  return {
    scope: {
      patient: '='
    },
    controller: NutritionController,
    templateUrl: templateUrl
  };
}

nutritionComponent.$inject = ['NutritionController'];

export {
  nutritionPermissionFactory,
  nutritionControllerFactory,
  nutritionComponent
};
