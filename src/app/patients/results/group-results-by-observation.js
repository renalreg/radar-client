import _ from 'lodash';

/* Group results for the same type of observation. */
function groupResultsByObservation(results, observations) {
  var groups = {};

  if (observations === undefined) {
    observations = [];
  } else {
    // Create an empty group for each obervation
    _.forEach(observations, function(observation) {
      var observationId = observation.id;

      if (groups[observationId] === undefined) {
        groups[observationId] = {
          observation: observation,
          results: [],
        };
      }
    });
  }

  // Group results by observation ID
  _.forEach(results, function(result) {
    var observation = result.observation;
    var observationId = observation.id;
    var group = groups[observationId];

    // First time we have seen this observation, create a group
    if (group === undefined) {
      groups[observationId] = {
        observation: observation,
        results: [],
      };
      group = groups[observationId];
      observations.push(observation);
    }

    // Add the result to the group
    group.results.push(result);
  });

  // Keep groups in the original order
  groups = _.map(observations, function(observation) {
    return groups[observation.id];
  });

  return groups;
}

export default groupResultsByObservation;
