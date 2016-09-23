import angular from 'angular';
import _ from 'lodash';

function getDownloadUrl(params) {
  // Download all users rather than just the current page
  params = angular.copy(params);
  delete params.page;
  delete params.perPage;

  return '/api/users.csv?' + $.param(params);
}

function userListControllerFactory(
  ListController, $injector, ListHelperProxy, store
) {
  var DEFAULT_FILTERS = {
    isEnabled: true
  };

  function UserListController($scope) {
    var self = this;

    $injector.invoke(ListController, self, {$scope: $scope});

    $scope.filters = angular.copy(DEFAULT_FILTERS);

    var proxy = new ListHelperProxy(update, {perPage: 50});
    proxy.load();

    $scope.proxy = proxy;
    $scope.search = search;
    $scope.clear = clear;
    $scope.count = 0;

    function filtersToParams(filters) {
      var params = {};

      var keys = ['username', 'email', 'firstName', 'lastName', 'isEnabled', 'isAdmin', 'hasLoggedIn'];

      _.forEach(keys, function(key) {
        var value = filters[key];

        if (value !== undefined && value !== null && value !== '') {
          params[key] = value;
        }
      });

      var groups = _.filter([filters.cohort, filters.hospital], function(group) {
        return group !== undefined && group !== null;
      });

      var groupIds = _.map(groups, function(group) {
        return group.id;
      });

      if (groupIds.length > 0) {
        params.group = groupIds.join(',');
      }

      return params;
    }

    function update() {
      var proxyParams = proxy.getParams();
      var params = angular.extend({}, proxyParams, filtersToParams($scope.filters));

      $scope.downloadUrl = getDownloadUrl(params);

      return self.load(store.findMany('users', params, true).then(function(data) {
        proxy.setItems(data.data);
        proxy.setCount(data.pagination.count);
        $scope.count = data.pagination.count;
        return data.data;
      }));
    }

    function search() {
      proxy.page = 1;
      return update();
    }

    function clear() {
      $scope.filters = angular.copy(DEFAULT_FILTERS);
      search();
    }
  }

  UserListController.$inject = ['$scope'];
  UserListController.prototype = Object.create(ListController.prototype);

  return UserListController;
}

userListControllerFactory.$inject = [
  'ListController', '$injector', 'ListHelperProxy', 'store'
];

export default userListControllerFactory;
