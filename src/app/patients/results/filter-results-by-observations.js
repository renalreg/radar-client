import _ from 'lodash';

function filterResultsByObservations() {
  return function filterResultsByObservations(results, observations) {
    var observationIds = _.map(observations, function(x) {
      return x.id;
    });

    results = _.filter(results, function(result) {
      var observationId = result.observation.id;
      return _.indexOf(observationIds, observationId) >= 0;
    });

    return results;
  };
}

export default filterResultsByObservations;
