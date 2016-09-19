import _ from 'lodash';

function sortCohorts() {
  return function sortCohorts(cohorts) {
    return _.sortBy(cohorts, function(x) {
      return x.name.toUpperCase();
    });
  };
}

export default sortCohorts;
