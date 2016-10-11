import _ from 'lodash';

/** Key used to group the results. */
function getKey(result) {
  // Group the results by source and date
  return result.sourceGroup.id + '.' + result.sourceType + '.' + result.date;
}

function groupResults(results) {
  var groups = [];
  var currentKey = null;
  var currentGroup = null;

  // Sort the results so they group properly
  results = _.sortBy(results, getKey);

  _.forEach(results, function(result) {
    var observation = result.observation;
    var observationId = observation.id;

    var key = getKey(result);

    // Start a new group if:
    // * The key has changed
    // * This is the first group
    // * We already have a result for this observation in this group
    if (
      key !== currentKey ||
      currentGroup === null ||
      currentGroup.results[observationId] !== undefined
    ) {
      currentKey = key;
      currentGroup = {
        date: result.date,
        getSource: function() {
          return result.getSource();
        },
        results: {}
      };
      groups.push(currentGroup);
    }

    // Add the result to the group
    currentGroup.results[observationId] = result;
  });

  return groups;
}

export default groupResults;
