(function() {
  'use strict';

  var app = angular.module('radar.patients.forms');

  app.factory('EntryPermission', ['PatientObjectPermission', function(PatientObjectPermission) {
    return PatientObjectPermission;
  }]);

  function controllerFactory(
    ModelListDetailController,
    EntryPermission,
    $injector,
    createSchema,
    formStore
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

      self.load(formStore.getEntries($scope.patient.id, $scope.form.id));

      $scope.create = function() {
        var item = formStore.create($scope.patient.id, $scope.form.id);
        self.edit(item);
      };

      $scope.$watch('items.length', function(count) {
        if ($scope.loading) {
          return;
        }

        $scope.$emit('entryCount', {
          patient: $scope.patient,
          form: $scope.form,
          count: count
        });
      });
    }

    EntriesController.$inject = ['$scope'];
    EntriesController.prototype = Object.create(ModelListDetailController.prototype);

    return EntriesController;
  }

  controllerFactory.$inject = [
    'ModelListDetailController',
    'EntryPermission',
    '$injector',
    'createSchema',
    'formStore'
  ];

  app.factory('EntriesController', controllerFactory);

  app.directive('entriesComponent', ['EntriesController', function(EntriesController) {
    return {
      scope: {
        patient: '=',
        form: '='
      },
      controller: EntriesController,
      templateUrl: 'app/patients/forms/entries-component.html'
    };
  }]);
})();
