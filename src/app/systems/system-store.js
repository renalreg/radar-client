function SystemStore(store, $q, session) {
  this.store = store;
  this.$q = $q;
  this.session = session;

  this.promise = null;
}

SystemStore.prototype.getCode = function(code) {
  return this._first(function(group) {
    return group.code === code;
  });
};

SystemStore.prototype.getId = function(id) {
  return this._first(function(group) {
    return group.id === id;
  });
};

SystemStore.prototype.getAll = function() {
  return this._load();
};

SystemStore.prototype._first = function(fn) {
  var self = this;

  return this._load().then(function(groups) {
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];

      if (fn(group)) {
        return group;
      }
    }

    return self.$q.reject();
  });
};

SystemStore.prototype._load = function() {
  var self = this;

  var user = self.session.user;
  if (user.forcePasswordChange) {
    return self.$q.reject();
  }

  // Only need to fetch the list of systems once as they are unlikely to change
  if (self.promise === null) {
    self.promise = self.store.findMany('groups', {type: 'SYSTEM'}).catch(function() {
      // Retry later
      self.promise = null;
      return self.$q.reject();
    });
  }

  return self.promise;
};

SystemStore.$inject = ['store', '$q', 'session'];

export default SystemStore;
