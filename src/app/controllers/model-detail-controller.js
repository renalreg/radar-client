import angular from 'angular';

function modelDetailControllerFactory(
  $q,
  $window,
  GrantPermission
) {
  /**
   * Controller for managing a single model.
   *
   * @class
   * @param {Object} $scope - angular scope.
   * @param {Object} params - optional parameters.
   */
  function ModelDetailController($scope, params) {
    this.scope = $scope;

    if (params.createPermission) {
      // Use create permission
      this._createPermission = params.createPermission;
    } else if (params.permission) {
      // Use generic permission
      this._createPermission = params.permission;
    } else {
      // Default to grant
      this._createPermission = new GrantPermission();
    }

    if (params.editPermission) {
      // Use edit permission
      this._editPermission = params.editPermission;
    } else if (params.permission) {
      // Use generic permission
      this._editPermission = params.permission;
    } else {
      // Default to grant
      this._editPermission = new GrantPermission();
    }

    if (params.removePermission) {
      // Use remove permission
      this._removePermission = params.removePermission;
    } else if (params.permission) {
      // Use generic permission
      this._removePermission = params.permission;
    } else {
      // Default to grant
      this._removePermission = new GrantPermission();
    }

    // True when the data is loading
    this.scope.loading = true;

    // True when the detail view is active
    this.scope.viewing = false;

    // True when the edit view is active
    this.scope.editing = false;

    // True when the item is saving
    this.scope.saving = false;

    this.scope.item = null;
    this.scope.originalItem = null;

    // Add methods to the scope
    this.scope.view = angular.bind(this, this.view);
    this.scope.edit = angular.bind(this, this.edit);
    this.scope.save = angular.bind(this, this.save);
    this.scope.saveAndView = angular.bind(this, this.saveAndView);
    this.scope.remove = angular.bind(this, this.remove);
    this.scope.viewEnabled = angular.bind(this, this.viewEnabled);
    this.scope.createEnabled = angular.bind(this, this.createEnabled);
    this.scope.editEnabled = angular.bind(this, this.editEnabled);
    this.scope.removeEnabled = angular.bind(this, this.removeEnabled);
    this.scope.saveEnabled = angular.bind(this, this.saveEnabled);
    this.scope.cancelEnabled = angular.bind(this, this.cancelEnabled);
    this.scope.createPermission = angular.bind(this, this.createPermission);
    this.scope.editPermission = angular.bind(this, this.editPermission);
    this.scope.removePermission = angular.bind(this, this.removePermission);
    this.scope.createVisible = angular.bind(this, this.createVisible);
    this.scope.editVisible = angular.bind(this, this.editVisible);
    this.scope.removeVisible = angular.bind(this, this.removeVisible);
  }

  ModelDetailController.$inject = ['$scope', 'params'];

  ModelDetailController.prototype.load = function(promise) {
    var self = this;

    // Start loading
    self.scope.loading = true;

    return $q.when(promise)
      .then(function(item) {
        self.scope.item = item;
        return item;
      })
      .finally(function() {
        // Finished loading
        self.scope.loading = false;
      });
  };

  /**
   * Warn the user that they will lose unsaved changes.
   *
   * @returns {boolean} - true if the user wants to discard changes.
   */
  ModelDetailController.prototype.discardChanges = function() {
    return $window.confirm('Discard unsaved changes?');
  };

  /**
   * Switch to the detail view.
   *
   * @param {Object} item - the item to view.
   * @returns {undefined}
   */
  ModelDetailController.prototype.view = function(item) {
    if (item === undefined) {
      item = this.scope.item;
    }

    // Can't view an unsaved item
    if (item !== null && item.getId() === null) {
      item = null;
    }

    // Can view if we're not editing, there is no item,
    // there are no unsaved changes, or the user is willing
    // to discard unsaved changes.
    var ok = !this.scope.editing ||
      this.scope.item === null ||
      !this.scope.item.isDirty() ||
      this.discardChanges();

    if (!ok) {
      return;
    }

    this.scope.viewing = true;
    this.scope.editing = false;

    this.scope.originalItem = null;
    this.scope.item = item;
  };

  /**
   * Switch to the edit view.
   *
   * @param {Object} item - item to edit.
   * @returns {undefined}
   */
  ModelDetailController.prototype.edit = function(item) {
    if (item === undefined) {
      item = this.scope.item;
    }

    // Can only edit an item if we're not already editing,
    // there are no unsaved changes, or the user is willing to
    // discard unsaved changed.
    var ok = !this.scope.editing ||
      !this.scope.item.isDirty() ||
      this.discardChanges();

    if (!ok) {
      return;
    }

    this.scope.viewing = false;
    this.scope.editing = true;

    // Clone the item so we can discard changes later
    this.scope.originalItem = item;
    this.scope.item = item.clone();
  };

  /**
   * Save the item.
   *
   * @returns {Object} - a promise.
   */
  ModelDetailController.prototype.save = function() {
    var self = this;

    self.scope.saving = true;

    return this.scope.item.save().finally(function() {
      self.scope.saving = false;
    });
  };

  /**
   * Convenience method to save an item and then view it.
   *
   * @returns {Object} - a promise.
   */
  ModelDetailController.prototype.saveAndView = function() {
    var self = this;

    return self.save().then(function(item) {
      self.view(item);
    });
  };

  /**
   * Remove/delete the item.
   *
   * @returns {Object} - a promise.
   */
  ModelDetailController.prototype.remove = function() {
    var self = this;

    self.scope.saving = true;

    return self.scope.item.remove()
      .then(function() {
        self.scope.originalItem = null;
        self.scope.item = null;
        self.view(null);
      })
      .finally(function() {
        self.scope.saving = false;
      });
  };

  /**
   * Return true if the view button is enabled.
   *
   * @returns {boolean} - true if the view button is enabled.
   */
  ModelDetailController.prototype.viewEnabled = function() {
    // Can view an item if exists, has been saved and is not
    // currently being saved.
    return this.scope.item !== null &&
      this.scope.item.getId() !== null &&
      !this.scope.saving;
  };

  /**
   * Return true if the create button is enabled.
   *
   * @returns {boolean} - true if the create button is enabled.
   */
  ModelDetailController.prototype.createEnabled = function() {
    // Can create a new item if there isn't an existing item and
    // we're not in the middle of saving.
    return this.scope.item === null && !this.scope.saving;
  };

  /**
   * Return true if the edit button is enabled.
   *
   * @returns {boolean} - true if the edit button is enabled.
   */
  ModelDetailController.prototype.editEnabled = function() {
    // Can edit an item if it exists, has been saved and is
    // not currently being saved.
    return this.scope.item !== null &&
      this.scope.item.getId() !== null &&
      !this.scope.saving;
  };

  /**
   * Return true if the remove button is enabled.
   *
   * @returns {boolean} - true if the remove button is enabled.
   */
  ModelDetailController.prototype.removeEnabled = function() {
    // Can remove/delete an item if it exists, has been saved and is
    // not currently being saved.
    return this.scope.item !== null &&
      this.scope.item.getId() !== null &&
      !this.scope.saving;
  };

  /**
   * Returns true if the save button is enabled.
   *
   * @returns {boolean} - true if the save button is enabled.
   */
  ModelDetailController.prototype.saveEnabled = function() {
    // Can save an item if it exists and isn't already in the process
    // of being saved.
    return this.scope.item !== null && !this.scope.saving;
  };

  /**
   * Returns true if the cancel button is enabled.
   *
   * @returns {boolean} - true if the cancel button is enabled.
   */
  ModelDetailController.prototype.cancelEnabled = function() {
    // Can cancel an edit if the item isn't in the process of being saved.
    return !this.scope.saving;
  };

  /**
   * Returns true if the user has permission to create a new item.
   *
   * @returns {boolean} - true if the user has permission to create a new item.
   */
  ModelDetailController.prototype.createPermission = function() {
    return this._createPermission.hasPermission();
  };

  /**
   * Returns true if the user has permission to edit this item.
   *
   * @returns {boolean} - true if the user has permission to edit this item.
   */
  ModelDetailController.prototype.editPermission = function() {
    return this._editPermission.hasObjectPermission(this.scope.item);
  };

  /**
   * Returns true if the user has permission to remove/delete this item.
   *
   * @returns {boolean} - true if the user has permission to remove/delete this item.
   */
  ModelDetailController.prototype.removePermission = function() {
    return this._removePermission.hasObjectPermission(this.scope.item);
  };

  /**
   * Returns true when the create button should be visible.
   *
   * @returns {boolean} - true when the create button should be visible.
   */
  ModelDetailController.prototype.createVisible = function() {
    // The create button should be visible if there isn't an existing item.
    return this.scope.item === null;
  };

  /**
   * Returns true when the edit button should be visible.
   *
   * @returns {boolean} - true when the edit button should be visible.
   */
  ModelDetailController.prototype.editVisible = function() {
    // The edit button should be visible if there is an existing item to edit.
    return this.scope.item !== null;
  };

  /**
   * Returns true when the remove button should be visible.
   *
   * @returns {boolean} - true when the remove button should be visible.
   */
  ModelDetailController.prototype.removeVisible = function() {
    // The remove button should be visible if there is an existing item to delete.
    return this.scope.item !== null;
  };

  return ModelDetailController;
}

modelDetailControllerFactory.$inject = [
  '$q',
  '$window',
  'GrantPermission'
];

export default modelDetailControllerFactory;
