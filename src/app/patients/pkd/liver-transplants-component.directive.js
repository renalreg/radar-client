(function() {
  'use strict';

  var app = angular.module('radar.patients.pkd');

  app.factory('LiverTransplantPermission', ['PatientSourceObjectPermission', function(PatientSourceObjectPermission) {
    return PatientSourceObjectPermission;
  }]);

  function controllerFactory(
    ModelListDetailController,
    LiverTransplantPermission,
    firstPromise,
    $injector,
    store
  ) {
    function LiverTransplantsController($scope) {
      var self = this;

      $injector.invoke(ModelListDetailController, self, {
        $scope: $scope,
        params: {
          permission: new LiverTransplantPermission($scope.patient)
        }
      });

      self.load(firstPromise([
        store.findMany('liver-transplants', {patient: $scope.patient.id}),
        store.findMany('liver-transplant-indications').then(function(indications) {
          $scope.indications = indications;
        }),
        store.findMany('liver-transplant-first-graft-sources').then(function(firstGraftSources) {
          $scope.firstGraftSources = firstGraftSources;
        }),
        store.findMany('liver-transplant-loss-reasons').then(function(lossReasons) {
          $scope.lossReasons = lossReasons;
        })
      ]));

      $scope.create = function() {
        var item = store.create('liver-transplants', {patient: $scope.patient.id});
        self.edit(item);
      };
    }

    LiverTransplantsController.$inject = ['$scope'];
    LiverTransplantsController.prototype = Object.create(ModelListDetailController.prototype);

    return LiverTransplantsController;
  }

  controllerFactory.$inject = [
    'ModelListDetailController',
    'LiverTransplantPermission',
    'firstPromise',
    '$injector',
    'store'
  ];

  app.factory('LiverTransplantsController', controllerFactory);

  app.directive('liverTransplantsComponent', ['LiverTransplantsController', function(LiverTransplantsController) {
    return {
      scope: {
        patient: '='
      },
      controller: LiverTransplantsController,
      templateUrl: 'app/patients/pkd/liver-transplants-component.html'
    };
  }]);
})();
