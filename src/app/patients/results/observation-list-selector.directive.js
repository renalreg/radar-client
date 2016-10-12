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
      selectedObservations: '=observations'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      var counts = {};

      // Update the observations counts when a result is added/updated/removed
      store.on('results', 'after_remove', load);
      store.on('results', 'after_save', load);

      // Add functions to the scope
      scope.getCount = getCount;
      scope.add = add;
      scope.remove = remove;
      scope.up = up;
      scope.down = down;

      // True while the data is loading
      scope.loading = true;

      load();

      /**
       * Load the observations.
       *
       * @returns {undefined}
       */
      function load() {
        adapter.get('/observation-counts', {patient: scope.patient.id}).then(function(response) {
          var observations = [];
          counts = {};

          _.forEach(response.data.data, function(x) {
            var observation = store.pushToStore(store.create('observations', x.observation));
            observations.push(observation);
            counts[observation.id] = x.count;
          });

          scope.observations = observations;

          // Finished loading
          scope.loading = false;
        });
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
    }
  };
}

observationListSelector.$inject = ['store', 'adapter'];

export default observationListSelector;
