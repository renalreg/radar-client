import _ from 'lodash';

import getPage from '../get-page.js';
import getForm from '../get-form.js';

import templateUrl from './cohort-navigation.html';

function getLinks(group, patient) {
  var links = [];

  _.forEach(group.pages, function(x) {
    var link = getPage(x.page, patient, group);

    if (!link) {
      return;
    }

    links.push({
      link: link,
      weight: x.weight
    });
  });

  var forms = _.sortBy(group.forms, 'weight');

  _.forEach(forms, function(x) {
    links.push({
      link: getForm(x.form, patient),
      weight: x.weight
    });
  });

  links = _.sortBy(links, 'weight');
  links = _.map(links, 'link');

  return links;
}


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
