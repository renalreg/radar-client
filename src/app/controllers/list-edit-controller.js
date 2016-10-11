import angular from 'angular';
import _ from 'lodash';

function listEditControllerFactory($q) {
  /** Controller for viewing and editing a list of items. */
  function ListEditController($scope) {
    this.scope = $scope;

    // True when the data is loading
    this.scope.loading = true;

    // List of items to display
    this.scope.items = [];

    // Add methods to the scope
    this.scope.append = angular.bind(this, this.append);
    this.scope.remove = angular.bind(this, this.remove);
    this.scope.removeEnabled = angular.bind(this, this.removeEnabled);
    this.scope.removePermission = angular.bind(this, this.removePermission);
  }

  ListEditController.$inject = ['$scope'];

  ListEditController.prototype.load = function(promise) {
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

  /** Append an item to the list of items. */
  ListEditController.prototype.append = function(item) {
    this.scope.items.push(item);
  };

  /** Remove an item from the list of items. */
  ListEditController.prototype.remove = function(item) {
    _.pull(this.scope.items, item);
  };

  /** Returns true if items can be removed. */
  ListEditController.prototype.removeEnabled = function() {
    return true;
  };

  /** Returns true if the user has permission to remove items. */
  ListEditController.prototype.removePermission = function() {
    return true;
  };

  return ListEditController;
}

listEditControllerFactory.$inject = ['$q'];

export default listEditControllerFactory;
