function radarRecruitmentGraph(adapter) {
  return {
    scope: {},
    template: '<div loading="loading"><div recruitment-graph title="RaDaR" data="data" class="graph"></div></div>',
    link: function(scope) {
      scope.loading = true;

      adapter.get('/stats/recruitment').then(function(response) {
        scope.loading = false;
        scope.data = response.data.points;
      });
    }
  };
}

radarRecruitmentGraph.$inject = ['adapter'];

export default radarRecruitmentGraph;
