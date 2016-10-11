function firstPromise($q) {
  /**
   * Takes a list of promises and returns another promise that
   * waits for them to all resolve and then resolves itself
   * with the first promise.
   *
   * Useful for fetching secondary data.
   */
  return function firstPromise(promises) {
    if (promises.length) {
      var promise = promises[0];

      return $q.all(promises).then(function() {
        return promise;
      });
    } else {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    }
  };
}

firstPromise.$inject = ['$q'];

export default firstPromise;
