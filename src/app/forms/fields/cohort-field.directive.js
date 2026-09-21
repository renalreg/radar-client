import sortGroups from '../../groups/sort-groups';

import templateUrl from './cohort-field.html';

function frmCohortField(session, cohortStore) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    template: templateUrl,
    link: function(scope) {
      cohortStore.findMany().then(function(cohorts) {
        scope.cohorts = sortGroups(cohorts);
      });
    }
  };
}

frmCohortField.$inject = ['session', 'cohortStore'];

export default frmCohortField;
