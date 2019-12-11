import angular from 'angular';
import _ from 'lodash';
import $ from 'jquery';

/**
 * Generate a URL to download the list of patients as CSV.
 *
 * @param {Object} params - URL parameters.
 * @returns {string} - URL to download the patient list.
 */
function getDownloadUrl(params) {
  // Download all patients rather than just the current page
  params = angular.copy(params);
  delete params.page;
  delete params.perPage;

  return '/api/patients.csv?' + $.param(params);
}

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
    current: true,
    test: false
  };

  /**
   * Controller for a list of patients.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientListController($scope) {
    var self = this;

    $scope.viewDemographicsPermission = hasPermission(session.user, 'VIEW_DEMOGRAPHICS');

    $injector.invoke(ListController, self, {$scope: $scope});

    // Initialise the filter to the defaults
    $scope.filters = angular.copy(DEFAULT_FILTERS);

    var 
      proxy = new ListHelperProxy(update, {
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

    var signedOffStatesPromise = store.findMany('signedOffStates').then(function(signedOffStates) {
      $scope.signedOffStates = signedOffStates;
    });
    
    /**
     * Get the groups to filter by.
     *
     * @param {Object} filters - patient list filters.
     * @returns {array} - list of groups to filter by.
     */
    function getGroups(filters) {
      return _.filter([filters.system, filters.cohort, filters.hospital], function(group) {
        return group != null;
      });
    }

    /**
     * Convert the list of filters to URL parameters.
     *
     * @param {Object} filters - patient list filters.
     * @returns {Object} - equivalent URL parameters.
     */
    function filtersToParams(filters) {
      var params = {};

      var keys = [
        'id',
        'firstName', 'lastName',
        'dateOfBirth', 'yearOfBirth',
        'dateOfDeath', 'yearOfDeath',
        'gender', 'patientNumber',
        'current', 'ukrdc', 'test',
        'signedOffState'
      ];

      _.forEach(keys, function(key) {
        var value = filters[key];

        if (value !== undefined && value !== null && value !== '') {
          if (key === 'gender' || key === 'signedOffState') {
            params[key] = value.id;
          } else {
            params[key] = value;
          }
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

    /**
     * Update the list of patients.
     *
     * @returns {Object} - a promise that resolves to a list of patients.
     */
    function update() {
      $scope.groups = getGroups($scope.filters);

      // List is currently sorted by group
      if (proxy.getSortBy().indexOf('group') === 0) {
        // Check if we are still filtering against the sorted group
        var found = _.some($scope.groups, function(group) {
          return 'group_' + group.id === proxy.getSortBy();
        });

        // Use the default ordering if we are no longer filtering by the sorted group
        if (!found) {
          proxy.sort('id', true, false);
        }
      }

      var proxyParams = proxy.getParams();
      var params = angular.extend({}, proxyParams, filtersToParams($scope.filters));

      $scope.downloadUrl = getDownloadUrl(params);

      return self.load(firstPromise([
        store.findMany('patients', params, true).then(function(data) {
          proxy.setItems(data.data);
          proxy.setCount(data.pagination.count);
          $scope.count = data.pagination.count;
          return data.data;
        }),
        genderPromise,
        signedOffStatesPromise
      ]));
    }

    /**
     * Search patients that match the filters.
     *
     * @returns {Object} - a promise that resolves to a list of patients.
     */
    function search() {
      // Jump back to the first page when updating the search
      proxy.page = 1;
      return update();
    }

    /**
     * Reset the filters and trigger a search.
     *
     * @returns {Object} - a promise that resolves to a list of patients.
     */
    function clear() {
      // Reset the filters back to the default
      $scope.filters = angular.copy(DEFAULT_FILTERS);
      return search();
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
