import _ from 'lodash';
import Highcharts from 'highcharts';

function patientsByGroupDateGraph(adapter) {
  return {
    scope: {
      groupType: '@',
      type: '@'
    },
    template: '<div loading="loading" class="graph"></div>',
    link: function(scope, element) {
      var params = {
        groupType: scope.groupType,
        type: scope.type
      };

      var title = scope.type === 'new' ? 'New Patients' : 'Total Patients';

      adapter.get('/stats/patients-by-group-date', params).then(function(response) {
        var options = {
          chart: {
            renderTo: element.get(0)
          },
          title: {
            text: title
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'Patients'
            },
            min: 0
          },
          series: []
        };

        var data= _.sortBy(response.data, 'group.name');

        _.forEach(data, function(group) {
          var series = {
            name: group.group.name,
            data: []
          };

          options.series.push(series);

          _.forEach(group.counts, function(count) {
            series.data.push([Date.parse(count.date), count.count]);
          });
        });

        new Highcharts.Chart(options);
      });
    }
  };
}

patientsByGroupDateGraph.$inject = ['adapter'];

export default patientsByGroupDateGraph;
