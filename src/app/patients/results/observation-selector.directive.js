import _ from 'lodash';

import templateUrl from './observation-selector.html';

/**
 * User interface for selecting an observation from a list.
 *
 * @param {Object} store - injected store object.
 * @returns {Object} - a directive.
 */
function observationSelector(store) {
  return {
    require: 'ngModel',
    templateUrl: templateUrl,
    scope: {
      'patient': '='
    },
    link: function(scope, element, attrs, ngModel) {
      // Mapping between group id and observations
      var groupObservations = {};

      // Currently selected groups (all observations are displayed when set to null)
      scope.group = null;

      // List of groups with at least one observation (displayed as tabs)
      scope.groups = [];

      // Currently selected observation
      scope.observation = null;

      // Currently displayed observations
      scope.observations = [];

      // True while the data is loading
      scope.loading = true;

      // Add functions to the scope
      scope.isActive = isActive;
      scope.use = use;
      scope.setGroup = setGroup;

      /**
       * Called when the model is updated outside the directive.
       *
       * @returns {undefined}
       */
      ngModel.$render = function() {
        scope.observation = ngModel.$viewValue;
      };

      load();

      /**
       * Get the observations for this group.
       *
       * @param {Object} group - the group to get observations for.
       * @returns {array} - the list of observations for this group.
       */
      function getObservations(group) {
        var key = group === null ? null : group.id;

        return groupObservations[key] || [];
      }

      /**
       * Set the current group.
       *
       * @param {Object} group - the selected group.
       * @returns {undefined}
       */
      function setGroup(group) {
        scope.group = group;
        scope.observations = getObservations(group);
      }

      /**
       * Returns true if the group is selected.
       *
       * @param {Object} group - a group.
       * @returns {boolean} - true if the group is active.
       */
      function isActive(group) {
        return scope.group === group;
      }

      /**
       * Select an observation.
       *
       * @param {Object} observation - the observation to select.
       * @returns {undefined}
       */
      function use(observation) {
        update(observation);
      }

      /**
       * Update the selected observation.
       *
       * @param {Object} observation - the observation to select.
       * @returns {undefined}
       */
      function update(observation) {
        scope.observation = observation;

        // Update the model value
        ngModel.$setViewValue(observation);
      }

      /**
       * Add an observation to the mapping.
       *
       * @param {Object} group - a group.
       * @param {Object} observation - an observation.
       * @returns {undefined}
       */
      function add(group, observation) {
        var key = group === null ? null : group.id;

        if (groupObservations[key] === undefined) {
          groupObservations[key] = [];
        }

        groupObservations[key].push(observation);
      }

      /**
       * Load the list of observations.
       *
       * @returns {undefined}
       */
      function load() {
        store.findMany('observations').then(function(observations) {
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
            return getObservations(group).length > 0;
          });

          // Default to first group with observations (otherwise all)
          if (scope.groups.length > 0) {
            setGroup(scope.groups[0]);
          } else {
            setGroup(null);
          }

          // Finished loading
          scope.loading = false;
        });
      }
    }
  };
}

observationSelector.$inject = ['store'];

export default observationSelector;
