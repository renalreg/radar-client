import sortGroups from '../../groups/sort-groups';

import templateUrl from './group-field.html';

function frmGroupField(store) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      store.findMany('groups').then(function(groups) {
        scope.groups = sortGroups(groups);
      });
    }
  };
}

frmGroupField.$inject = ['store'];

export default frmGroupField;
