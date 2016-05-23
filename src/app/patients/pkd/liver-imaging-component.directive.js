(function() {
  'use strict';

  var app = angular.module('radar.patients.pkd');

  app.factory('LiverImagingPermission', ['PatientSourceObjectPermission', function(PatientSourceObjectPermission) {
    return PatientSourceObjectPermission;
  }]);

  function controllerFactory(
    ModelListDetailController,
    LiverImagingPermission,
    firstPromise,
    $injector,
    store
  ) {
    function LiverImagingController($scope) {
      var self = this;

      $injector.invoke(ModelListDetailController, self, {
        $scope: $scope,
        params: {
          permission: new LiverImagingPermission($scope.patient)
        }
      });

      self.load(firstPromise([
        store.findMany('liver-imaging', {patient: $scope.patient.id}),
        store.findMany('liver-imaging-types').then(function(imagingTypes) {
          $scope.imagingTypes = imagingTypes;
        })
      ]));

      $scope.create = function() {
        var item = store.create('liver-imaging', {patient: $scope.patient.id, imagingType: $scope.imagingTypes[0]});
        self.edit(item);
      };
    }

    LiverImagingController.$inject = ['$scope'];
    LiverImagingController.prototype = Object.create(ModelListDetailController.prototype);

    return LiverImagingController;
  }

  controllerFactory.$inject = [
    'ModelListDetailController',
    'LiverImagingPermission',
    'firstPromise',
    '$injector',
    'store'
  ];

  app.factory('LiverImagingController', controllerFactory);

  app.directive('liverImagingComponent', ['LiverImagingController', function(LiverImagingController) {
    return {
      scope: {
        patient: '='
      },
      controller: LiverImagingController,
      templateUrl: 'app/patients/pkd/liver-imaging-component.html'
    };
  }]);
})();
