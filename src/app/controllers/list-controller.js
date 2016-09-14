function listControllerFactory($q) {
  /** Controller for viewing a list of items */
  function ListController($scope) {
    this.scope = $scope;

    this.scope.loading = true;
    this.scope.items = [];
  }

  ListController.$inject = ['$scope'];

  ListController.prototype.load = function(promise) {
    var self = this;

    self.scope.loading = true;

    return $q.when(promise)
      .then(function(items) {
        self.scope.items = items;
      })
      .finally(function() {
        self.scope.loading = false;
      });
  };

  return ListController;
}

listControllerFactory.$inject = ['$q'];

export default listControllerFactory;
