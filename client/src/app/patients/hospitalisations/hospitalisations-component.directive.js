(function() {
  'use strict';

  var app = angular.module('radar.patients.hospitalisations');

  app.factory('HospitalisationPermission', ['PatientSourceObjectPermission', function(PatientSourceObjectPermission) {
    return PatientSourceObjectPermission;
  }]);

  function controllerFactory(
    ModelListDetailController,
    HospitalisationPermission,
    $injector,
    store
  ) {
    function HospitalisationsController($scope) {
      var self = this;

      $injector.invoke(ModelListDetailController, self, {
        $scope: $scope,
        params: {
          permission: new HospitalisationPermission($scope.patient)
        }
      });

      self.load(store.findMany('hospitalisations', {patient: $scope.patient.id}));

      $scope.create = function() {
        var item = store.create('hospitalisations', {patient: $scope.patient.id});
        self.edit(item);
      };
    }

    HospitalisationsController.$inject = ['$scope'];
    HospitalisationsController.prototype = Object.create(ModelListDetailController.prototype);

    return HospitalisationsController;
  }

  controllerFactory.$inject = [
    'ModelListDetailController',
    'HospitalisationPermission',
    '$injector',
    'store'
  ];

  app.factory('HospitalisationsController', controllerFactory);

  app.directive('hospitalisationsComponent', ['HospitalisationsController', function(HospitalisationsController) {
    return {
      scope: {
        patient: '='
      },
      controller: HospitalisationsController,
      templateUrl: 'app/patients/hospitalisations/hospitalisations-component.html'
    };
  }]);
})();
