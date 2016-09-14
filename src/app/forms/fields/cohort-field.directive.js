import templateUrl from './cohort-field.html';

function frmCohortField(sortCohorts, session, cohortStore) {
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

frmCohortField.$inject = ['sortCohorts', 'session', 'cohortStore'];

export default frmCohortField;
