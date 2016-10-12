import getLinks from '../get-links';

import templateUrl from './system-navigation.html';

function systemNavigation() {
  return {
    scope: {
      system: '=',
      patient: '='
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.items = getLinks(scope.system, scope.patient);
    }
  };
}

export default systemNavigation;
