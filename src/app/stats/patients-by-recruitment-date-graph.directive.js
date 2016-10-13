import _ from 'lodash';
import Highcharts from 'highcharts';

function patientsByRecruitmentDateGraph(adapter) {
  return {
    scope: {
      group: '='
    },
    template: '<div loading="loading" class="graph"></div>',
    link: function(scope, element) {
      scope.loading = true;

      scope.$watch('group', function(group) {
        scope.loading = true;

        var params = {group: group.id};

        adapter.get('/stats/patients-by-recruitment-date', params).then(function(response) {
          scope.loading = false;

          var data = response.data.points;

          var newData = [];
          var totalData = [];

          _.forEach(data, function(x) {
            var date = Date.parse(x.date);
            newData.push({x: date, y: x.newPatients});
            totalData.push({x: date, y: x.totalPatients});
          });

          newData = _.sortBy(newData, 'x');
          totalData = _.sortBy(totalData, 'x');

          var options = {
            chart: {
              renderTo: element.get(0),
              type: 'spline',
              zoomType: 'x',
              height: 600
            },
            title: {
              text: group.name
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
            series: [
              {
                name: 'New',
                data: newData
              },
              {
                name: 'Total',
                data: totalData
              }
            ],
            plotOptions: {
              spline: {
                marker: {
                  enabled: false
                }
              }
            }
          };

          new Highcharts.Chart(options);
        });
      });
    }
  };
}

patientsByRecruitmentDateGraph.$inject = ['adapter'];

export default patientsByRecruitmentDateGraph;
