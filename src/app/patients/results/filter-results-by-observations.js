import _ from 'lodash';

/**
 * Get the results that match any of the supplied observations.
 *
 * @param {array} results - a list of results.
 * @param {array} observations - a list of observations.
 * @returns {array} - a list of results that match any of the supplied observations.
 */
function filterResultsByObservations(results, observations) {
  var observationIds = _.map(observations, function(x) {
    return x.id;
  });

  results = _.filter(results, function(result) {
    var observationId = result.observation.id;
    return _.indexOf(observationIds, observationId) >= 0;
  });

  return results;
}

export default filterResultsByObservations;
