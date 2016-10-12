import getLinks from '../get-links';

import templateUrl from './cohort-navigation.html';

function cohortNavigation() {
  return {
    scope: {
      cohort: '=',
      patient: '='
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.items = getLinks(scope.cohort, scope.patient);
    }
  };
}

export default cohortNavigation;
