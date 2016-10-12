import sortGroups from '../../groups/sort-groups';

import templateUrl from './system-field.html';

function frmSystemField(session, systemStore) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      systemStore.getAll().then(function(systems) {
        scope.systems = sortGroups(systems);
      });
    }
  };
}

frmSystemField.$inject = ['session', 'systemStore'];

export default frmSystemField;
