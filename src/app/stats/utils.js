import _ from 'lodash';

/** Get the top n groups by number of patients. */
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
