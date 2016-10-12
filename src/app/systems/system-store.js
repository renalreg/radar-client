function SystemStore(store, $q) {
  this.store = store;
  this.$q = $q;

  this.promise = null;
}

SystemStore.prototype.getCode = function(code) {
  return this.load().then(function(groups) {
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];

      if (group.code === code) {
        return group;
      }
    }

    return this.$q.reject();
  });
};

SystemStore.prototype.getAll = function() {
  return this.load();
};

SystemStore.prototype.load = function() {
  // Only need to fetch the list of systems once as they are unlikely to change
  if (this.promise === null) {
    this.promise = this.store.findMany('groups', {type: 'SYSTEM'});
  }

  return this.promise;
};

SystemStore.$inject = ['store', '$q'];

export default SystemStore;
