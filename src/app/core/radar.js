(function() {
  'use strict';

  var app = angular.module('radar.core');

  app.factory('radar', ['session', 'store', '$q', function(session, store, $q) {
    var promises = [];

    var userId = session.getUserId();

    if (userId !== null) {
      var sessionUserDeferred = $q.defer();

      store.findOne('users', userId)
        .then(function(user) {
          session.setUser(user);
        })
        ['catch'](function() {
          session.logout(true);
        })
        ['finally'](function() {
          // Always resolve so the application still boots even if our token is no longer valid
          sessionUserDeferred.resolve();
        });

      promises.push(sessionUserDeferred.promise);
    }

    var promise = $q.all(promises);

    var service = {
      ready: false,
      readyPromise: promise
    };

    promise.then(function() {
      service.ready = true;
    });

    return service;
  }]);
})();
