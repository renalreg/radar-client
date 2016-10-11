import templateUrl from './entries-component.html';

function entryPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

entryPermissionFactory.$inject = ['PatientObjectPermission'];

/*
 * An entry is a completed form. This component is for managing forms that allow
 * multiple entries.
 */
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

    // If sort order is specified in the schema
    if (schema.sortBy) {
      $scope.sortBy = 'data.' + schema.sortBy;
      $scope.reverse = schema.reverse;
    } else {
      // Sort newest first by default
      $scope.sortBy = 'createdDate';
      $scope.reverse = true;
    }

    self.load(formStore.getEntries($scope.patient.id, $scope.form.id));

    $scope.create = function() {
      var item = formStore.create($scope.patient.id, $scope.form.id);
      self.edit(item);
    };

    // Watch for entries being added and removed
    $scope.$watchCollection('items', function(items) {
      if ($scope.loading) {
        return;
      }

      // Number of entries
      var count = items.length;

      // Update the number of entries for this type of form (used in the tabs)
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
