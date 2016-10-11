import sortCohorts from '../../cohorts/sort-cohorts';

import templateUrl from './patient-navigation.html';

function patientNavigation() {
  return {
    scope: {
      patient: '=',
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.$watchCollection(function() {
        // Only show current cohorts in the navigation
        return scope.patient.getCurrentCohorts();
      }, function(cohorts) {
        // Sort the cohorts by name
        scope.cohorts = sortCohorts(cohorts);
      });
    }
  };
}

export default patientNavigation;
