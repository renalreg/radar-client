(function() {
  'use strict';

  var app = angular.module('radar.patients.medications');

  app.factory('EntryPermission', ['PatientObjectPermission', function(PatientObjectPermission) {
    return PatientObjectPermission;
  }]);

  function controllerFactory(
    ModelListDetailController,
    EntryPermission,
    $injector,
    store,
    createSchema
  ) {
    function EntriesController($scope) {
      var self = this;

      $injector.invoke(ModelListDetailController, self, {
        $scope: $scope,
        params: {
          permission: new EntryPermission($scope.patient)
        }
      });

      $scope.schema = createSchema($scope.form.data);

      self.load(store.findMany('entries', {
        patient: $scope.patient.id,
        form: $scope.form.id
      }));

      $scope.create = function() {
        var item = store.create('entries', {
          patient: $scope.patient.id,
          form: $scope.form.id,
          data: {} // TODO
        });

        // TODO
        item.errors.data = {};

        self.edit(item);
      };
    }

    EntriesController.$inject = ['$scope'];
    EntriesController.prototype = Object.create(ModelListDetailController.prototype);

    return EntriesController;
  }

  controllerFactory.$inject = [
    'ModelListDetailController',
    'EntryPermission',
    '$injector',
    'store',
    'createSchema'
  ];

  app.factory('EntriesController', controllerFactory);

  app.directive('entriesComponent', ['EntriesController', function(EntriesController) {
    return {
      scope: {
        patient: '=',
        form: '='
      },
      controller: EntriesController,
      templateUrl: 'app/patients/questionnaires/entries-component.html'
    };
  }]);
})();
