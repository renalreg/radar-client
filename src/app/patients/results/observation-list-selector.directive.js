import _ from 'lodash';

import swap from '../../utils/swap';

import templateUrl from './observation-list-selector.html';

/**
 * User interface for selecting the observations to display.
 *
 * @param {Object} store - injected store object.
 * @param {Object} adapter - injected adapter object.
 * @returns {Object} - a directive.
 */
function observationListSelector(store, adapter) {
  return {
    scope: {
      patient: '=patient',
      selectedObservations: '=observations',
    },
    templateUrl: templateUrl,
    link: function (scope) {
      var counts = {};

      // Mapping between group id and observations
      var groupObservations = {};
      scope.groupObservations = groupObservations;

      // Currently selected groups (all observations are displayed when set to null)
      scope.group = null;

      // List of groups with at least one observation (displayed as tabs)
      scope.groups = [];

      // Update the observations counts when a result is added/updated/removed
      store.on('results', 'after_remove', load);
      store.on('results', 'after_save', load);

      // Add functions to the scope
      scope.getCount = getCount;
      scope.add = add;
      scope.remove = remove;
      scope.up = up;
      scope.down = down;
      scope.isActive = isActive;
      scope.setGroup = setGroup;

      // True while the data is loading
      scope.loading = true;

      load();

      /**
       * Load the observations.
       *
       * @returns {undefined}
       */
      function load() {
        adapter
          .get('/observation-counts', { patient: scope.patient.id })
          .then(function (response) {
            var observations = [];
            counts = {};

            _.forEach(response.data.data, function (x) {
              var observation = store.pushToStore(
                store.create('observations', x.observation)
              );
              observations.push(observation);
              counts[observation.id] = x.count;
              _.forEach(observations, function (observation) {
                addToGroupObs(null, observation);

                _.forEach(observation.groups, function (group) {
                  // Add observation to group
                  addToGroupObs(group.group, observation);
                });
              });
            });

            var unique_observations = new Set(observations);

            scope.observations = Array.from(unique_observations);

            // Get's patients groups sorted by name
            scope.groups = _.sortBy(scope.patient.getGroups(), 'shortName');

            // Remove groups that aren't cohorts
            scope.groups = _.filter(scope.groups, function (group) {
              return filterGroups(group);
            });

            // Finished loading
            scope.loading = false;
          });
      }

      /**
       * Fiter groups based on being a cohort
       *
       * @param {Object} group - the group to check for cohort.
       * @returns {Object} group - the group if it is a cohort.
       */
      function filterGroups(group) {
        if (group.type == 'COHORT') {
          return group;
        }
      }

      /**
       * Set the current group.
       *
       * @param {Object} group - the selected group.
       * @returns {undefined}
       */
      function setGroup(group) {
        scope.group = group;
        var unique_observations = new Set(getObservations(group));
        var observations = Array.from(unique_observations);

        scope.observations = _.sortBy(observations, [
          function (obs) {
            return findGroupWeightInObservation(group, obs);
          },
          function (obs) {
            return obs.name.toLowerCase();
          },
        ]);
      }

      function findGroupWeightInObservation(group, obs) {
        if (!group) {
          return;
        }
        for (var i = 0; i < obs.groups.length; i++) {
          if (obs.groups[i].group.id === group.id) {
            return obs.groups[i].weight;
          }
        }
        return;
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
       * Add an observation to the mapping.
       *
       * @param {Object} group - a group.
       * @param {Object} observation - an observation.
       * @returns {undefined}
       */
      function addToGroupObs(group, observation) {
        var key = group === null ? null : group.id;

        if (groupObservations[key] === undefined) {
          groupObservations[key] = [];
        }

        groupObservations[key].push(observation);
      }

      /**
       * Get the number of results for the supplied observation.
       *
       * @param {Object} observation - an observation.
       * @returns {number} - the number of results for this observation.
       */
      function getCount(observation) {
        return counts[observation.id];
      }

      /**
       * Add an observation to the list to display.
       *
       * @param {Object} observation - the observation to add.
       * @returns {undefined}
       */
      function add(observation) {
        // Attempt to remove the observation first so an already selectedObservations
        // observation will be moved to the bottom of the list.
        remove(observation);
        scope.selectedObservations.push(observation);
      }

      /**
       * Remove an observation from the list to display.
       *
       * @param {Object} observation - the observation to remove.
       * @returns {undefined}
       */
      function remove(observation) {
        _.pull(scope.selectedObservations, observation);
      }

      /**
       * Move an observation up the list.
       *
       * @param {Object} observation - the observation to move up.
       * @returns {undefined}
       */
      function up(observation) {
        var index = _.indexOf(scope.selectedObservations, observation);

        // Check if the observation can be moved up
        if (index > 0) {
          swap(scope.selectedObservations, index, index - 1);
        }
      }

      /**
       * Move an observation down the list.
       *
       * @param {Object} observation - the observation to move down.
       * @returns {undefined}
       */
      function down(observation) {
        var index = _.indexOf(scope.selectedObservations, observation);
        var lastIndex = scope.selectedObservations.length - 1;

        // Check if the observation can be moved down
        if (index < lastIndex) {
          swap(scope.selectedObservations, index, index + 1);
        }
      }
    },
  };
}

observationListSelector.$inject = ['store', 'adapter'];

export default observationListSelector;
