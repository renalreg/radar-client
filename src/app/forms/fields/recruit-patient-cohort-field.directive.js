import _ from 'lodash';

import templateUrl from './cohort-field.html';

function frmRecruitPatientCohortField(sortCohorts, cohortStore, session, hasPermissionForGroup) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.$watch(function() {
        return session.user;
      }, function(user) {
        setCohorts([]);

        cohortStore.findMany().then(function(cohorts) {
          cohorts = _.filter(cohorts, function(x) {
            return !x.hasDependencies && hasPermissionForGroup(user, x, 'RECRUIT_PATIENT');
          });

          setCohorts(cohorts);
        });
      });

      function setCohorts(cohorts) {
        scope.cohorts = sortCohorts(cohorts);
      }
    }
  };
}

frmRecruitPatientCohortField.$inject = ['sortCohorts', 'cohortStore', 'session', 'hasPermissionForGroup'];

export default frmRecruitPatientCohortField;
