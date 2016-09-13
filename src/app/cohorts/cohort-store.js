function cohortStore(store, $q) {
  return {
    findOne: function(id) {
      return store.findOne('groups', id, true).then(function(group) {
        if (group.type === 'COHORT') {
          return group;
        } else {
          $q.reject();
        }
      });
    },
    findMany: function(params) {
      if (params === undefined) {
        params = {};
      }

      params.type = 'COHORT';

      return store.findMany('groups', params);
    }
  };
}

cohortStore.$inject = ['store', '$q'];

export default cohortStore;
