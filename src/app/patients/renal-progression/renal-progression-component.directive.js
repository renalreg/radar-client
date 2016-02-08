(function() {
  'use strict';

  var app = angular.module('radar.patients.renalProgression');

  app.factory('RenalProgressionPermission', ['PatientObjectPermission', function(PatientObjectPermission) {
    return PatientObjectPermission;
  }]);

  function controllerFactory(
    ModelDetailController,
    RenalProgressionPermission,
    $injector,
    store
  ) {
    function RenalProgressionController($scope) {
      var self = this;

      $injector.invoke(ModelDetailController, self, {
        $scope: $scope,
        params: {
          permission: new RenalProgressionPermission($scope.patient)
        }
      });

      self.load(store.findFirst('renal-progressions', {patient: $scope.patient.id})).then(function() {
        self.view();
      });

      $scope.create = function() {
        var item = store.create('renal-progressions', {patient: $scope.patient.id});
        self.edit(item);
      };
    }

    RenalProgressionController.$inject = ['$scope'];
    RenalProgressionController.prototype = Object.create(ModelDetailController.prototype);

    return RenalProgressionController;
  }

  controllerFactory.$inject = [
    'ModelDetailController',
    'RenalProgressionPermission',
    '$injector',
    'store'
  ];

  app.factory('RenalProgressionController', controllerFactory);

  app.directive('renalProgressionComponent', ['RenalProgressionController', function(RenalProgressionController) {
    return {
      scope: {
        patient: '='
      },
      controller: RenalProgressionController,
      templateUrl: 'app/patients/renal-progression/renal-progression-component.html'
    };
  }]);
})();
