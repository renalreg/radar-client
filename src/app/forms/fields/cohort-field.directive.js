import sortCohorts from '../../cohorts/sort-cohorts';

import templateUrl from './cohort-field.html';

function frmCohortField(session, cohortStore) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      cohortStore.findMany().then(function(cohorts) {
        scope.cohorts = sortCohorts(cohorts);
      });
    }
  };
}

frmCohortField.$inject = ['session', 'cohortStore'];

export default frmCohortField;
