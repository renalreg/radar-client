import _ from 'lodash';

function modelFactory(store) {
  function Model(modelName, data) {
    var self = this;

    if (data === undefined) {
      data = {};
    }

    self.modelName = modelName;
    self.isSaving = false;
    self.isDeleted = false;
    self.isValid = true;
    self.isError = false;
    self.isLoading = false;
    self.errors = {};

    self.meta = [];
    self.meta = _.keysIn(self);

    self.create(data);
  }

  Model.prototype.isDirty = function() {
    return store.isDirty(this);
  };

  Model.prototype.isPristine = function() {
    return store.isPristine(this);
  };

  Model.prototype.create = function(data) {
    var self = this;

    _.forEach(data, function(value, key) {
      self[key] = value;
    });
  };

  Model.prototype.update = function(data) {
    var self = this;

    var keys = _.keys(self);
    keys = _.difference(keys, self.meta);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      delete this[key];
    }

    _.forEach(data, function(value, key) {
      self[key] = value;
    });
  };

  Model.prototype.getData = function() {
    // TODO call getData on children too
    return _.omit(this, this.meta);
  };

  Model.prototype.getId = function() {
    return this.id || null;
  };

  Model.prototype.save = function() {
    return store.save(this);
  };

  Model.prototype.revert = function() {
    this.update(this.originalData);
  };

  Model.prototype.reload = function(force) {
    if (force === undefined) {
      force = false;
    }

    if (force || !this.isLoading) {
      var id = this.getId();

      if (id !== null) {
        store.findOne(this.modelName, id);
      }
    }
  };

  Model.prototype.remove = function() {
    return store.remove(this);
  };

  Model.prototype.clone = function() {
    var Model = store.getModelConstructor(this.modelName);
    return new Model(this.modelName, this.getData());
  };

  return Model;
}

modelFactory.$inject = ['store'];

export default modelFactory;
