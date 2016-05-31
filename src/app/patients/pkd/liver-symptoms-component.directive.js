(function() {
  'use strict';

  var app = angular.module('radar.patients.pkd');

  app.factory('LiverSymptomsPermission', ['PatientObjectPermission', function(PatientObjectPermission) {
    return PatientObjectPermission;
  }]);

  function controllerFactory(
    ModelDetailController,
    LiverSymptomsPermission,
    $injector,
    store
  ) {
    function LiverSymptomsController($scope) {
      var self = this;

      $injector.invoke(ModelDetailController, self, {
        $scope: $scope,
        params: {
          permission: new LiverSymptomsPermission($scope.patient)
        }
      });

      self.load(store.findFirst('liver-symptoms', {patient: $scope.patient.id})).then(function() {
        self.view();
      });

      $scope.create = function() {
        var item = store.create('liver-symptoms', {patient: $scope.patient.id});
        self.edit(item);
      };
    }

    LiverSymptomsController.$inject = ['$scope'];
    LiverSymptomsController.prototype = Object.create(ModelDetailController.prototype);

    return LiverSymptomsController;
  }

  controllerFactory.$inject = [
    'ModelDetailController',
    'LiverSymptomsPermission',
    '$injector',
    'store'
  ];

  app.factory('LiverSymptomsController', controllerFactory);

  app.directive('liverSymptomsComponent', ['LiverSymptomsController', function(LiverSymptomsController) {
    return {
      scope: {
        patient: '='
      },
      controller: LiverSymptomsController,
      templateUrl: 'app/patients/pkd/liver-symptoms-component.html'
    };
  }]);
})();
