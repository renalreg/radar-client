import _ from 'lodash';

import templateUrl from './cohort-navigation.html';

function cohortNavigation(patientPages) {
  return {
    scope: {
      patient: '=',
      cohort: '='
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.items = [];

      var pages = scope.cohort.pages;

      _.forEach(pages, function(x) {
        var item = patientPages[x];

        if (item !== undefined) {
          scope.items.push(item);
        }
      });
    }
  };
}

cohortNavigation.$inject = ['patientPages'];

export default cohortNavigation;
