(function() {
  'use strict';

  var app = angular.module('radar.patients.pkd');

  app.factory('LiverDiseasesPermission', ['PatientObjectPermission', function(PatientObjectPermission) {
    return PatientObjectPermission;
  }]);

  function controllerFactory(
    ModelDetailController,
    LiverDiseasesPermission,
    $injector,
    store
  ) {
    function LiverDiseasesController($scope) {
      var self = this;

      $injector.invoke(ModelDetailController, self, {
        $scope: $scope,
        params: {
          permission: new LiverDiseasesPermission($scope.patient)
        }
      });

      self.load(store.findFirst('liver-diseases', {patient: $scope.patient.id})).then(function() {
        self.view();
      });

      $scope.create = function() {
        var item = store.create('liver-diseases', {patient: $scope.patient.id});
        self.edit(item);
      };
    }

    LiverDiseasesController.$inject = ['$scope'];
    LiverDiseasesController.prototype = Object.create(ModelDetailController.prototype);

    return LiverDiseasesController;
  }

  controllerFactory.$inject = [
    'ModelDetailController',
    'LiverDiseasesPermission',
    '$injector',
    'store'
  ];

  app.factory('LiverDiseasesController', controllerFactory);

  app.directive('liverDiseasesComponent', ['LiverDiseasesController', function(LiverDiseasesController) {
    return {
      scope: {
        patient: '='
      },
      controller: LiverDiseasesController,
      templateUrl: 'app/patients/pkd/liver-diseases-component.html'
    };
  }]);
})();
