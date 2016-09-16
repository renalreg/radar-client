import _ from 'lodash';

import templateUrl from './patient-navigation.html';

function patientNavigation(sortCohorts) {
  return {
    scope: {
      patient: '=',
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.$watchCollection(function() {
        return scope.patient.getCurrentCohorts();
      }, function(cohorts) {
        scope.cohorts = sortCohorts(cohorts);
      });
    }
  };
}

patientNavigation.$inject = ['sortCohorts'];

export default patientNavigation;
