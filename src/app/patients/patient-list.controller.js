import angular from 'angular';
import _ from 'lodash';

function patientListControllerFactory(
  ListController,
  $injector,
  ListHelperProxy,
  firstPromise,
  store,
  hasPermission,
  session
) {
  var DEFAULT_FILTERS = {
    current: true
  };

  function PatientListController($scope) {
    var self = this;

    $scope.viewDemographicsPermission = hasPermission(session.user, 'VIEW_DEMOGRAPHICS');

    $injector.invoke(ListController, self, {$scope: $scope});

    $scope.filters = angular.copy(DEFAULT_FILTERS);

    var proxy = new ListHelperProxy(update, {
      perPage: 50,
      sortBy: 'id',
      reverse: true
    });
    proxy.load();

    $scope.proxy = proxy;
    $scope.search = search;
    $scope.clear = clear;
    $scope.count = 0;

    var genderPromise = store.findMany('genders').then(function(genders) {
      $scope.genders = genders;
    });

    function getGroups(filters) {
      return _.filter([filters.cohort, filters.hospital], function(group) {
        return group !== undefined && group !== null;
      });
    }

    function filtersToParams(filters) {
      var params = {};

      var keys = [
        'id',
        'firstName', 'lastName',
        'dateOfBirth', 'yearOfBirth',
        'dateOfDeath', 'yearOfDeath',
        'gender', 'patientNumber',
        'current', 'ukrdc'
      ];

      _.forEach(keys, function(key) {
        var value = filters[key];

        if (value !== undefined && value !== null && value !== '') {
          params[key] = value;
        }
      });

      var groups = getGroups(filters);

      var groupIds = _.map(groups, function(group) {
        return group.id;
      });

      if (groupIds.length > 0) {
        params.group = groupIds.join(',');
      }

      return params;
    }

    function update() {
      $scope.groups = getGroups($scope.filters);

      // Sorted by group
      if (proxy.getSortBy().indexOf('group') === 0) {
        // Check if we are still filtering against the sorted group
        var found = _.some($scope.groups, function(group) {
          return 'group' + group.id === proxy.getSortBy();
        });

        // Use the default ordering if we are no longer filtering by the sorted group
        if (!found) {
          proxy.sort('id', true, false);
        }
      }

      var proxyParams = proxy.getParams();
      var params = angular.extend({}, proxyParams, filtersToParams($scope.filters));

      return self.load(firstPromise([
        store.findMany('patients', params, true).then(function(data) {
          proxy.setItems(data.data);
          proxy.setCount(data.pagination.count);
          $scope.count = data.pagination.count;
          return data.data;
        }),
        genderPromise
      ]));
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

  PatientListController.$inject = ['$scope'];
  PatientListController.prototype = Object.create(ListController.prototype);

  return PatientListController;
}

patientListControllerFactory.$inject = [
  'ListController',
  '$injector',
  'ListHelperProxy',
  'firstPromise',
  'store',
  'hasPermission',
  'session'
];

export default patientListControllerFactory;
