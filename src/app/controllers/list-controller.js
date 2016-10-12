function listControllerFactory($q) {
  /**
   * Controller for viewing a list of items.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function ListController($scope) {
    this.scope = $scope;

    // True when the data is loading
    this.scope.loading = true;

    // List of items to display
    this.scope.items = [];
  }

  ListController.$inject = ['$scope'];

  ListController.prototype.load = function(promise) {
    var self = this;

    // Start loading
    self.scope.loading = true;
    self.scope.items = [];

    return $q.when(promise)
      .then(function(items) {
        self.scope.items = items;
        return items;
      })
      .finally(function() {
        // Finished loading
        self.scope.loading = false;
      });
  };

  return ListController;
}

listControllerFactory.$inject = ['$q'];

export default listControllerFactory;
