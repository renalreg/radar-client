import _ from 'lodash';

import templateUrl from './patients-by-group-table.html';

function patientsByGroupTable(adapter) {
  return {
    scope: {
      group: '=',
      groupType: '@',
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.loading = true;

      scope.$watch('group', function(group) {
        var params = {
          groupType: scope.groupType
        };

        if (group) {
          params.group = group.id;
        }

        scope.loading = true;

        adapter.get('/patients-by-group', params).then(function(response) {
          scope.loading = false;
          scope.counts = _.sortBy(response.data.counts, 'count').reverse();
        });
      });
    }
  };
}

patientsByGroupTable.$inject = ['adapter'];

export default patientsByGroupTable;
