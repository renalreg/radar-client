import _ from 'lodash';

import getPage from '../get-page.js';
import getForm from '../get-form.js';

import templateUrl from './cohort-navigation.html';

/** Combine the page and form links for this group. */
function getLinks(group, patient) {
  var links = [];

  _.forEach(group.pages, function(x) {
    // Get this link for this page (returns null if not found)
    var link = getPage(x.page, patient, group);

    if (!link) {
      return;
    }

    // Add the page to the list of links
    links.push({
      link: link,
      weight: x.weight
    });
  });

  // Create a link for each form
  _.forEach(group.forms, function(x) {
    // Get the link for this form
    var link = getForm(x.form, patient);

    links.push({
      link: link,
      weight: x.weight
    });
  });

  // Sort pages/forms by weight (lower numbers first)
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
