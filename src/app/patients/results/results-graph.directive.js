import _ from 'lodash';
import Highcharts from 'highcharts';

function resultsGraph() {
  return {
    scope: {
      observation: '=',
      results: '='
    },
    link: function(scope, element) {
      scope.$watch('observation', load);
      scope.$watch('results', load);

      function load() {
        var observation = scope.observation;
        var results = scope.results;

        if (!observation || !results) {
          return;
        }

        var data = [];

        _.forEach(results, function(x) {
          var value = +x.sentValue;
          if (!isNaN(value)) {
            data.push({
              x: Date.parse(x.date),
              y: value,
              source: x.getSource()
            });
          }
        });

        data = _.sortBy(data, 'x');

        var options = {
          chart: {
            zoomType: 'x',
            renderTo: element.get(0)
          },
          title: {
            text: observation.name
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: observation.units
            }
          },
          series: [{
            name: observation.shortName,
            data: data
          }],
          plotOptions: {
            line: {
              marker: {
                enabled: true
              },
              turboThreshold: 10000
            }
          },
          tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b> ({point.source})<br/>',
          }
        };

        new Highcharts.Chart(options);
      }
    }
  };
}

export default resultsGraph;
