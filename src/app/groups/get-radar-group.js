function getRadarGroup(store, $q) {
  var deferred = null;

  function getRadarGroup() {
    if (deferred === null) {
      deferred = $q.defer();

      var params = {
        code: 'RADAR',
        type: 'SYSTEM'
      };

      store.findFirst('groups', params)
        .then(function(group) {
          deferred.resolve(group);
        })
        .catch(function() {
          deferred.reject();
        });
    }

    return deferred.promise;
  }

  return getRadarGroup;
}

getRadarGroup.$inject = ['store', '$q'];

export default getRadarGroup;
