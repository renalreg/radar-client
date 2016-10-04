import templateUrl from './entry-component.html';

function entryControllerFactory(
  ModelDetailController,
  EntryPermission,
  $injector,
  createSchema,
  formStore
) {
  function EntryController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new EntryPermission($scope.patient)
      }
    });

    var schema = createSchema($scope.form.data);
    $scope.schema = schema;

    self.load(formStore.getEntry($scope.patient.id, $scope.form.id)).then(function() {
      self.view();
    });

    $scope.create = function() {
      var item = formStore.create($scope.patient.id, $scope.form.id);
      self.edit(item);
    };

    $scope.$watch('item', function(item) {
      if ($scope.loading) {
        return;
      }

      var count = item ? 1 : 0;

      $scope.$emit('entryCount', {
        patient: $scope.patient,
        form: $scope.form,
        count: count
      });
    });
  }

  EntryController.$inject = ['$scope'];
  EntryController.prototype = Object.create(ModelDetailController.prototype);

  return EntryController;
}

entryControllerFactory.$inject = [
  'ModelDetailController',
  'EntryPermission',
  '$injector',
  'createSchema',
  'formStore'
];

function entryComponent(EntryController) {
  return {
    scope: {
      patient: '=',
      form: '='
    },
    controller: EntryController,
    templateUrl: templateUrl
  };
}

entryComponent.$inject = ['EntryController'];

export {
  entryControllerFactory,
  entryComponent
};
