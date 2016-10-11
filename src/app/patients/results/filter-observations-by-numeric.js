import _ from 'lodash';

/**
 * Returns the observations that have numeric values.
 *
 * @param {array} observations - a list of observations.
 * @returns {array} - a list of numeric observations.
 */
function filterObservationsByNumeric(observations) {
  return _.filter(observations, function(observation) {
    var valueType = observation.valueType.id;
    return valueType === 'INTEGER' || valueType === 'REAL';
  });
}

export default filterObservationsByNumeric;
