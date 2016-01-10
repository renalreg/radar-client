(function() {
  'use strict';

  var app = angular.module('radar.patients.results');

  app.directive('resultGraph', ['Highcharts', '_', function(Highcharts, _) {
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
            data.push({
              x: Date.parse(x.date),
              y: x.value,
              dataSource: x.dataSource.getName()
            });
          });

          data = _.sortBy(data, 'x');

          console.log(data);

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
                }
              }
            },
            tooltip: {
              pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b> ({point.dataSource})<br/>',
            }
          };

          new Highcharts.Chart(options);
        }
      }
    };
  }]);
})();
