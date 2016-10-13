import _ from 'lodash';
import Highcharts from 'highcharts';
import { getTopGroups } from './utils';

function patientsByRecruitmentGroupDateGraph(adapter) {
  return {
    scope: {
      group: '=',
      groupType: '@',
      type: '@',
      top: '@'
    },
    template: '<div loading="loading" class="graph"></div>',
    link: function(scope, element) {
      scope.loading = true;

      scope.$watch('group', function(group) {
        scope.loading = true;

        var params = {};

        if (group) {
          params.group = group.id;
        }

        var title = scope.type === 'new' ? 'New Patients' : 'Total Patients';
        var key = scope.type === 'new' ? 'newPatients' : 'totalPatients';

        adapter.get('/stats/patients-by-recruitment-group-date', params).then(function(response) {
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

          var n = parseInt(scope.top);
          var isVisible;

          if (n) {
            var topGroups = getTopGroups(response.data, n);

            isVisible = function(group) {
              return _.includes(topGroups, group.id);
            };
          } else {
            isVisible = function() {
              return true;
            };
          }

          var data = _.sortBy(response.data, 'group.name');

          _.forEach(data, function(group) {
            var series = {
              name: group.group.name,
              data: [],
              visible: isVisible(group.group)
            };

            options.series.push(series);

            _.forEach(group.counts, function(count) {
              series.data.push([Date.parse(count.date), count[key]]);
            });
          });

          new Highcharts.Chart(options);
        });
      });
    }
  };
}

patientsByRecruitmentGroupDateGraph.$inject = ['adapter'];

export default patientsByRecruitmentGroupDateGraph;
