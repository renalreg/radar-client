import _ from 'lodash';

/**
 * Get the top n groups by number of patients.
 *
 * @param {array} data - list of groups and number of patients.
 * @param {integer} n - maximum number of groups to return.
 * @returns {array} - the top n groups by number of patients.
 */
function getTopGroups(data, n) {
  return _
    .chain(data)
    .orderBy([function(x) {
      if (x.counts.length) {
        return x.counts[x.counts.length - 1].totalPatients;
      } else {
        return 0;
      }
    }, 'group.name'], ['desc', 'asc'])
    .take(n)
    .map('group.id')
    .value();
}

export {
  getTopGroups
};
