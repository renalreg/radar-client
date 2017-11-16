import sortGroups from '../../groups/sort-groups';

import templateUrl from './group-field.html';

function frmGroupField(store, session) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      params: '=',
      userOnly: '&?',
      type: '@?'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      var user = session.user;
      if (scope.userOnly && !user.isAdmin) {
        var groups = [];
        for (var i = 0; i < user.groups.length; i++) {
          if (user.groups[i].group.type === scope.type) {
            groups.push(user.groups[i].group);
          }
        }
        scope.groups = sortGroups(groups);
      } else {
        store.findMany('groups', scope.params).then(function(groups) {
          scope.groups = sortGroups(groups);
        });
      }
    }
  };
}

frmGroupField.$inject = ['store', 'session'];

export default frmGroupField;
