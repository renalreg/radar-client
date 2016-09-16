import _ from 'lodash';

import templateUrl from './observation-list-selector.html';

function observationListSelector(store, adapter) {
  return {
    scope: {
      patient: '=patient',
      selectedObservations: '=observations'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      var counts = {};

      store.on('results', 'after_remove', load);
      store.on('results', 'after_save', load);

      scope.getCount = getCount;
      scope.add = add;
      scope.remove = remove;
      scope.up = up;
      scope.down = down;

      load();

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
        });
      }

      function getCount(observation) {
        return counts[observation.id];
      }

      function add(observation) {
        remove(observation);
        scope.selectedObservations.push(observation);
      }

      function remove(observation) {
        _.pull(scope.selectedObservations, observation);
      }

      function up(observation) {
        var index = _.indexOf(scope.selectedObservations, observation);

        if (index > 0) {
          swap(scope.selectedObservations, index, index - 1);
        }
      }

      function down(observation) {
        var index = _.indexOf(scope.selectedObservations, observation);
        var lastIndex = scope.selectedObservations.length - 1;

        if (index < lastIndex) {
          swap(scope.selectedObservations, index, index + 1);
        }
      }

      function swap(array, x, y) {
        var temp = array[x];
        array[x] = array[y];
        array[y] = temp;
      }
    }
  };
}

observationListSelector.$inject = ['store', 'adapter'];

export default observationListSelector;
