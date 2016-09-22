import _ from 'lodash';

import templateUrl from './patients-by-recruited-group-table.html';

function patientsByRecruitedGroupTable(adapter) {
  return {
    scope: {
      group: '='
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.loading = true;

      scope.$watch('group', function(group) {
        var params = {};

        if (group) {
          params.group = group.id;
        }

        scope.loading = true;

        adapter.get('/stats/patients-by-recruited-group', params).then(function(response) {
          scope.loading = false;
          scope.counts = _.sortBy(response.data.counts, 'count').reverse();
        });
      });
    }
  };
}

patientsByRecruitedGroupTable.$inject = ['adapter'];

export default patientsByRecruitedGroupTable;
