import templateUrl from './entries-component.html';

function entryPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

entryPermissionFactory.$inject = ['PatientObjectPermission'];

function entriesControllerFactory(
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

    var schema = createSchema($scope.form.data);
    $scope.schema = schema;

    if (schema.sortBy) {
      $scope.sortBy = 'data.' + schema.sortBy;
      $scope.reverse = schema.reverse;
    } else {
      $scope.sortBy = 'createdDate';
      $scope.reverse = true;
    }

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

entriesControllerFactory.$inject = [
  'ModelListDetailController',
  'EntryPermission',
  '$injector',
  'createSchema',
  'formStore'
];

function entriesComponent(EntriesController) {
  return {
    scope: {
      patient: '=',
      form: '='
    },
    controller: EntriesController,
    templateUrl: templateUrl
  };
}

entriesComponent.$inject = ['EntriesController'];

export {
  entriesControllerFactory,
  entriesComponent
};
