import Highcharts from 'highcharts';
import _ from 'lodash';

function recruitmentGraph() {
  return {
    scope: {
      title: '@',
      data: '='
    },
    link: function(scope, element) {
      scope.$watch('data', load);

      function load() {
        var data = scope.data;

        if (!data) {
          return;
        }

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
            zoomType: 'x',
            height: 600
          },
          title: {
            text: scope.title
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
            {name: 'New', data: newData},
            {name: 'Total', data: totalData}
          ],
          plotOptions: {
            line: {
              marker: {
                enabled: true
              }
            }
          }
        };

        new Highcharts.Chart(options);
      }
    }
  };
}

export default recruitmentGraph;
