(function() {
  'use strict';

  var app = angular.module('radar.groups');

  app.factory('sortGroups', ['_', function(_) {
    return function sortGroups(groups) {
      return _.sortBy(groups, ['type', function(x) {
        return x.name.toUpperCase();
      }]);
    };
  }]);
})();
