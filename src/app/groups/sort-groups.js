import _ from 'lodash';

function sortGroups(groups) {
  return _.sortBy(groups, ['type', function(x) {
    return x.name.toUpperCase();
  }]);
}

export default sortGroups;
