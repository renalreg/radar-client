import angular from 'angular';

function modelEditControllerFactory($q) {
  /**
   * Controller for editing a model.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function ModelEditController($scope) {
    this.scope = $scope;

    this.scope.loading = true;
    this.scope.item = null;
    this.scope.originalItem = null;

    // Add methods to scope
    this.scope.save = angular.bind(this, this.save);
    this.scope.saveEnabled = angular.bind(this, this.saveEnabled);
  }

  ModelEditController.$inject = ['$scope'];

  ModelEditController.prototype.load = function(promise) {
    var self = this;

    self.scope.loading = true;

    return $q.when(promise)
      .then(function(item) {
        self.scope.originalItem = item;
        self.scope.item = item.clone();
      })
      .finally(function() {
        self.scope.loading = false;
      });
  };

  /**
   * Save the item.
   *
   * @returns {Object} - a promise;
   */
  ModelEditController.prototype.save = function() {
    var self = this;

    self.scope.saving = true;

    return self.scope.item.save()
      .then(function(item) {
        self.scope.originalItem = item;
        self.scope.item = item.clone();
        return item;
      })
      .finally(function() {
        self.scope.saving = false;
      });
  };

  /**
   * Returns true if save is enabled.
   *
   * @returns {boolean} - true if save is enabled.
   */
  ModelEditController.prototype.saveEnabled = function() {
    return this.scope.item !== null && !this.scope.item.isSaving;
  };

  return ModelEditController;
}

modelEditControllerFactory.$inject = ['$q'];

export default modelEditControllerFactory;
