(function() {
  'use strict';

  var app = angular.module('radar.patients.results');

  app.directive('observationSelector', ['store', '_', function(store, _) {
    return {
      require: 'ngModel',
      templateUrl: 'app/patients/results/observation-selector.html',
      scope: {
        'patient': '='
      },
      link: function(scope, element, attrs, ngModel) {
        scope.group = null;
        scope.groups = [];
        scope.observation = null;
        scope.observations = {};
        scope.loading = true;

        scope.getObservations = function(group) {
          var key = group === null ? null : group.id;

          return scope.observations[key] || [];
        };

        scope.setGroup = function(group) {
          scope.group = group;
        };

        scope.isActive = function(group) {
          return scope.group === group;
        };

        ngModel.$render = function() {
          scope.observation = ngModel.$viewValue;
        };

        scope.use = function(observation) {
          update(observation);
        };

        scope.drop = function(observation) {
          update(null);
        };

        function update(observation) {
          scope.observation = observation;
          ngModel.$setViewValue(observation);
        }

        // Load observations
        store.findMany('observations').then(function(observations) {
          // Add a observation
          function add(group, observation) {
            var key = group === null ? null : group.id;

            if (scope.observations[key] === undefined) {
              scope.observations[key] = [];
            }

            scope.observations[key].push(observation);
          }

          _.forEach(observations, function(observation) {
            // Add observation to all
            add(null, observation);

            _.forEach(observation.groups, function(group) {
              // Add observation to group
              add(group, observation);
            });
          });

          // Get's patients groups sorted by name
          scope.groups = _.sortBy(scope.patient.getGroups(), 'shortName');

          // Remove groups that don't have any observations
          scope.groups = _.filter(scope.groups, function(group) {
            return scope.getObservations(group).length > 0;
          });

          // Default to first group with observations (otherwise all)
          if (scope.groups.length > 0) {
            scope.setGroup(scope.groups[0]);
          }

          // Finished loading
          scope.loading = false;
        });
      }
    };
  }]);
})();
