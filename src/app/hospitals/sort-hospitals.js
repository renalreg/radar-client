import _ from 'lodash';

function sortHospitals() {
  return function sortHospitals(hospitals) {
    return _.sortBy(hospitals, function(x) {
      return x.name.toUpperCase();
    });
  };
}

export default sortHospitals;
