(function() {
  'use strict';

  var app = angular.module('radar.logs');

  function controllerFactory(
    ListController,
    $injector,
    ListHelperProxy,
    store,
    $q
  ) {
    function LogListController($scope) {
      var self = this;

      $injector.invoke(ListController, self, {$scope: $scope});

      $scope.filters = {};

      var proxy = new ListHelperProxy(update, {
        perPage: 100,
        sortBy: 'date',
        reverse: true
      });
      proxy.load();

      $scope.proxy = proxy;
      $scope.search = search;
      $scope.errors = {};
      $scope.clear = clear;
      $scope.count = 0;

      function update() {
        var proxyParams = proxy.getParams();
        var params = angular.extend({}, proxyParams, $scope.filters);

        var promise = store.findMany('logs', params, true)
          .then(function(data) {
            proxy.setItems(data.data);
            proxy.setCount(data.pagination.count);
            $scope.count = data.pagination.count;
            $scope.errors = {};
            return data.data;
          })
          .catch(function(response) {
            $scope.errors = response.errors;
            return $q.reject();
          });

        return self.load(promise);
      }

      function search() {
        proxy.page = 1;
        return update();
      }

      function clear() {
        $scope.filters = {};
        search();
      }
    }

    LogListController.$inject = ['$scope'];
    LogListController.prototype = Object.create(ListController.prototype);

    return LogListController;
  }

  controllerFactory.$inject = [
    'ListController',
    '$injector',
    'ListHelperProxy',
    'store',
    '$q'
  ];

  app.factory('LogListController', controllerFactory);
})();
