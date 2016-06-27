(function() {
  'use strict';

  var app = angular.module('radar.diagnoses');

  app.factory('DiagnosisPermission', ['AdminPermission', function(AdminPermission) {
    return AdminPermission;
  }]);

  function controllerFactory(
    ModelListDetailController,
    DiagnosisPermission,
    $injector,
    store,
    _
  ) {
    function DiagnosesController($scope) {
      var self = this;

      $injector.invoke(ModelListDetailController, self, {
        $scope: $scope,
        params: {
          permission: new DiagnosisPermission($scope.patient)
        }
      });

      self.load(store.findMany('diagnoses'));

      $scope.create = function() {
        var item = store.create('diagnoses', {groups: []});
        self.edit(item);
      };
    }

    DiagnosesController.$inject = ['$scope'];
    DiagnosesController.prototype = Object.create(ModelListDetailController.prototype);

    return DiagnosesController;
  }

  controllerFactory.$inject = [
    'ModelListDetailController',
    'DiagnosisPermission',
    '$injector',
    'store',
    '_'
  ];

  app.factory('DiagnosesController', controllerFactory);

  app.directive('diagnosesComponent', ['DiagnosesController', function(DiagnosesController) {
    return {
      controller: DiagnosesController,
      templateUrl: 'app/diagnoses/diagnoses-component.html'
    };
  }]);
})();
