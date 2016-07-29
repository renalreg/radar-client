(function() {
  'use strict';

  var app = angular.module('radar.patients.pkd');

  app.factory('NutritionPermission', ['PatientSourceObjectPermission', function(PatientSourceObjectPermission) {
    return PatientSourceObjectPermission;
  }]);

  function controllerFactory(
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

  controllerFactory.$inject = [
    'ModelListDetailController',
    'NutritionPermission',
    'firstPromise',
    '$injector',
    'store'
  ];

  app.factory('NutritionController', controllerFactory);

  app.directive('nutritionComponent', ['NutritionController', function(NutritionController) {
    return {
      scope: {
        patient: '='
      },
      controller: NutritionController,
      templateUrl: 'app/patients/pkd/nutrition-component.html'
    };
  }]);
})();
