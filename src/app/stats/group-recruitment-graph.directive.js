function groupRecruitmentGraph(adapter) {
  return {
    scope: {
      group: '='
    },
    template: '<div loading="loading"><div recruitment-graph title="{{group.name}}" data="data" class="graph"></div></div>',
    link: function(scope) {

      scope.loading = true;

      scope.$watch('group', function(group) {
        if (!group) {
          return;
        }

        scope.loading = true;

        adapter.get('/recruitment-by-month', {group: group.id}).then(function(response) {
          scope.loading = false;
          scope.data = response.data.points;
        });
      });
    }
  };
}

groupRecruitmentGraph.$inject = ['adapter'];

export default groupRecruitmentGraph;
