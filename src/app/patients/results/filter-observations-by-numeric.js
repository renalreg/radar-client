import _ from 'lodash';

function filterObservationsByNumeric() {
  return function filterObservationsByNumeric(observations) {
    return _.filter(observations, function(observation) {
      var valueType = observation.valueType.id;
      return valueType === 'INTEGER' || valueType === 'REAL';
    });
  };
}

export default filterObservationsByNumeric;
