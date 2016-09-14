import templateUrl from './group-field.html';

function frmGroupField(sortGroups, store) {
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

frmGroupField.$inject = ['sortGroups', 'store'];

export default frmGroupField;
