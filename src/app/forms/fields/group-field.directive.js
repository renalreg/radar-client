import sortGroups from '../../groups/sort-groups';

import templateUrl from './group-field.html';

function frmGroupField(store) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      params: '='
    },
    templateUrl: templateUrl,
    link: function(scope) {
      store.findMany('groups', scope.params).then(function(groups) {
        scope.groups = sortGroups(groups);
      });
    }
  };
}

frmGroupField.$inject = ['store'];

export default frmGroupField;
