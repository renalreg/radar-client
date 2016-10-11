import _ from 'lodash';

/** Returns the observations that have numeric values. */
function filterObservationsByNumeric(observations) {
  return _.filter(observations, function(observation) {
    var valueType = observation.valueType.id;
    return valueType === 'INTEGER' || valueType === 'REAL';
  });
}

export default filterObservationsByNumeric;
