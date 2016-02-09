(function() {
  'use strict';

  var app = angular.module('radar.posts');

  function controllerFactory(
    ListController,
    $injector,
    ListHelperProxy,
    store
  ) {
    function PostListController($scope) {
      var self = this;

      $injector.invoke(ListController, self, {$scope: $scope});

      var proxy = new ListHelperProxy(update, {perPage: 3});
      proxy.load();

      $scope.proxy = proxy;

      function update() {
        var params = proxy.getParams();
        params.sort = '-publishedDate';

        self.load(store.findMany('posts', params, true).then(function(data) {
          proxy.setItems(data.data);
          proxy.setCount(data.pagination.count);
          return data.data;
        }));
      }

      function search() {
        proxy.page = 1;
        update();
      }
    }

    PostListController.$inject = ['$scope'];
    PostListController.prototype = Object.create(ListController.prototype);

    return PostListController;
  }

  controllerFactory.$inject = [
    'ListController',
    '$injector',
    'ListHelperProxy',
    'store'
  ];

  app.factory('PostListController', controllerFactory);
})();
