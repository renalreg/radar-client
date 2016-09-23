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
      scope.loading = true;

      var params = {groupType: scope.groupType};

      var title = scope.type === 'new' ? 'New Patients' : 'Total Patients';
      var key = scope.type === 'new' ? 'newPatients' : 'totalPatients';

      adapter.get('/stats/patients-by-group-date', params).then(function(response) {
        scope.loading = false;

        var options = {
          chart: {
            renderTo: element.get(0),
            type: 'spline',
            zoomType: 'x',
            height: 600
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
          series: [],
          plotOptions: {
            spline: {
              marker: {
                enabled: false
              }
            }
          }
        };

        var data= _.sortBy(response.data, 'group.name');

        _.forEach(data, function(group) {
          var series = {
            name: group.group.name,
            data: []
          };

          options.series.push(series);

          _.forEach(group.counts, function(count) {
            series.data.push([Date.parse(count.date), count[key]]);
          });
        });

        new Highcharts.Chart(options);
      });
    }
  };
}

patientsByGroupDateGraph.$inject = ['adapter'];

export default patientsByGroupDateGraph;
