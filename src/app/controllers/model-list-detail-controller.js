import angular from 'angular';
import _ from 'lodash';

function modelListDetailControllerFactory(
  $window,
  $q,
  GrantPermission
) {
  /**
   * Controller for managing a list of models.
   *
   * @class
   * @param {Object} $scope - angular scope.
   * @param {Object} params - optional parameters.
   */
  function ModelListDetailController($scope, params) {
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

    // True when the item is saving
    this.scope.saving = false;

    // True when the detail view is active
    this.scope.viewing = false;

    // True when the edit view is active
    this.scope.editing = false;

    this.scope.originalItem = null;
    this.scope.item = null;
    this.scope.items = [];

    // Add methods to scope
    this.scope.list = angular.bind(this, this.list);
    this.scope.view = angular.bind(this, this.view);
    this.scope.edit = angular.bind(this, this.edit);
    this.scope.remove = angular.bind(this, this.remove);
    this.scope.save = angular.bind(this, this.save);
    this.scope.saveAndList = angular.bind(this, this.saveAndList);
    this.scope.saveAndView = angular.bind(this, this.saveAndView);
    this.scope.listEnabled = angular.bind(this, this.listEnabled);
    this.scope.createEnabled = angular.bind(this, this.createEnabled);
    this.scope.viewEnabled = angular.bind(this, this.viewEnabled);
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

  ModelListDetailController.$inject = ['$scope', 'params'];

  ModelListDetailController.prototype.load = function(promise) {
    var self = this;

    self.scope.loading = true;
    self.scope.items = [];

    return $q.when(promise).then(function(items) {
      self.scope.loading = false;
      self.scope.items = items;
    });
  };

  /**
   * Warn the user that they will lose unsaved changes.
   *
   * @returns {boolean} - true if the user wants to discard changes.
   */
  ModelListDetailController.prototype.discardChanges = function() {
    return $window.confirm('Discard unsaved changes?');
  };

  /**
   * Switch to the list view.
   *
   * @returns {undefined}
   */
  ModelListDetailController.prototype.list = function() {
    var ok = this.scope.item === null || !this.scope.editing || !this.scope.item.isDirty() ||
      this.discardChanges();

    if (!ok) {
      return;
    }

    this.scope.viewing = false;
    this.scope.editing = false;
    this.scope.originalItem = null;
    this.scope.item = null;
  };

  /**
   * Switch to the detail view.
   *
   * @param {Object} item - the item to view.
   * @returns {undefined}
   */
  ModelListDetailController.prototype.view = function(item) {
    var ok = this.scope.item === null || !this.scope.editing || !this.scope.item.isDirty() ||
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
  ModelListDetailController.prototype.edit = function(item) {
    var ok = this.scope.item === null || !this.scope.editing || !this.scope.item.isDirty() ||
      this.discardChanges();

    if (!ok) {
      return;
    }

    this.scope.viewing = false;
    this.scope.editing = true;
    this.scope.originalItem = item;
    this.scope.item = item.clone();
  };

  /**
   * Remove/delete an item.
   *
   * @param {Object} item - the item to remove.
   * @returns {Object} - a promise.
   */
  ModelListDetailController.prototype.remove = function(item) {
    var self = this;

    if (self.scope.item !== null && self.scope.item.getId() === item.getId()) {
      if (self.scope.item.isDirty() && !self.discardChanges()) {
        return;
      }

      self.scope.viewing = false;
      self.scope.editing = false;
      self.scope.originalItem = null;
      self.scope.item = null;
    }

    return item.remove().then(function() {
      _.pull(self.scope.items, item);
    });
  };

  /**
   * Save the item.
   *
   * @returns {Object} - a promise.
   */
  ModelListDetailController.prototype.save = function() {
    var self = this;

    self.scope.saving = true;

    return self.scope.item.save()
      .then(function(item) {
        var x = self.scope.items.indexOf(item);

        if (x === -1) {
          self.scope.items.push(item);
        }

        return item;
      })
      .finally(function() {
        self.scope.saving = false;
      });
  };

  /**
   * Convenience method to save an item and then the list.
   *
   * @returns {Object} - a promise.
   */
  ModelListDetailController.prototype.saveAndList = function() {
    var self = this;

    return self.save().then(function() {
      self.list();
    });
  };

  /**
   * Convenience method to save an item and then view it.
   *
   * @returns {Object} - a promise.
   */
  ModelListDetailController.prototype.saveAndView = function() {
    var self = this;

    return self.save().then(function(item) {
      self.view(item);
    });
  };

  /**
   * Return true if the list button is enabled.
   *
   * @returns {boolean} - true if the list button is enabled.
   */
  ModelListDetailController.prototype.listEnabled = function() {
    return !this.scope.saving;
  };

  /**
   * Return true if the create button is enabled.
   *
   * @returns {boolean} - true if the create button is enabled.
   */
  ModelListDetailController.prototype.createEnabled = function() {
    return !this.scope.saving;
  };

  /**
   * Return true if the view button is enabled.
   *
   * @param {Object} item - the item to view.
   * @returns {boolean} - true if the view button is enabled.
   */
  ModelListDetailController.prototype.viewEnabled = function(item) {
    return item !== null &&
      item.getId() !== null &&
      !item.isDeleted &&
      !this.scope.saving;
  };

  /**
   * Return true if the edit button is enabled.
   *
   * @param {Object} item - the item to edit.
   * @returns {boolean} - true if the edit button is enabled.
   */
  ModelListDetailController.prototype.editEnabled = function(item) {
    return item !== null &&
      item.getId() !== null &&
      !item.isDeleted &&
      !this.scope.saving;
  };

  /**
   * Return true if the remove button is enabled.
   *
   * @param {Object} item - the item to remove.
   * @returns {boolean} - true if the remove button is enabled.
   */
  ModelListDetailController.prototype.removeEnabled = function(item) {
    return item !== null &&
      item.getId() !== null &&
      !item.isSaving &&
      !item.isDeleted;
  };

  /**
   * Returns true if the save button is enabled.
   *
   * @returns {boolean} - true if the save button is enabled.
   */
  ModelListDetailController.prototype.saveEnabled = function() {
    return !this.scope.saving;
  };

  /**
   * Returns true if the cancel button is enabled.
   *
   * @returns {boolean} - true if the cancel button is enabled.
   */
  ModelListDetailController.prototype.cancelEnabled = function() {
    return !this.scope.saving;
  };

  /**
   * Returns true if the user has permission to create a new item.
   *
   * @returns {boolean} - true if the user has permission to create a new item.
   */
  ModelListDetailController.prototype.createPermission = function() {
    return this._createPermission.hasPermission();
  };

  /**
   * Returns true if the user has permission to edit this item.
   *
   * @param {Object} item - the item to edit.
   * @returns {boolean} - true if the user has permission to edit this item.
   */
  ModelListDetailController.prototype.editPermission = function(item) {
    return this._editPermission.hasObjectPermission(item);
  };

  /**
   * Returns true if the user has permission to remove/delete this item.
   *
   * @param {Object} item - the item to remove.
   * @returns {boolean} - true if the user has permission to remove/delete this item.
   */
  ModelListDetailController.prototype.removePermission = function(item) {
    return this._removePermission.hasObjectPermission(item);
  };

  /**
   * Returns true when the create button should be visible.
   *
   * @returns {boolean} - true when the create button should be visible.
   */
  ModelListDetailController.prototype.createVisible = function() {
    return true;
  };

  /**
   * Returns true when the edit button should be visible.
   *
   * @param {Object} item - the item to edit.
   * @returns {boolean} - true when the edit button should be visible.
   */
  ModelListDetailController.prototype.editVisible = function(item) {
    return item !== null && item.getId() !== null;
  };

  /**
   * Returns true when the remove button should be visible.
   *
   * @param {Object} item - the item to delete.
   * @returns {boolean} - true when the remove button should be visible.
   */
  ModelListDetailController.prototype.removeVisible = function(item) {
    return item !== null && item.getId() !== null;
  };

  return ModelListDetailController;
}

modelListDetailControllerFactory.$inject = [
  '$window',
  '$q',
  'GrantPermission'
];

export default modelListDetailControllerFactory;
