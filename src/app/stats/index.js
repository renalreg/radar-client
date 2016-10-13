import angular from 'angular';

import patientsByRecruitmentDateGraph from './patients-by-recruitment-date-graph.directive';
import patientsByGroupTable from './patients-by-group-table.directive';
import patientsByGroupDateGraph from './patients-by-group-date-graph.directive';
import patientsByRecruitmentGroupTable from './patients-by-recruitment-group-table.directive';
import patientsByRecruitmentGroupDateGraph from './patients-by-recruitment-group-date-graph.directive';

import templateUrl from './stats.html';

function config($stateProvider) {
  $stateProvider.state('stats', {
    url: '/stats/{systemId:int}',
    templateUrl: templateUrl,
    controller: ['$scope', 'system', function($scope, system) {
      $scope.system = system;
    }],
    resolve: {
      system: ['$stateParams', 'systemStore', function($stateParams, systemStore) {
        return systemStore.getId($stateParams.systemId);
      }]
    }
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.stats', [])
  .config(config)
  .directive('patientsByRecruitmentDateGraph', patientsByRecruitmentDateGraph)
  .directive('patientsByGroupTable', patientsByGroupTable)
  .directive('patientsByGroupDateGraph', patientsByGroupDateGraph)
  .directive('patientsByRecruitmentGroupTable', patientsByRecruitmentGroupTable)
  .directive('patientsByRecruitmentGroupDateGraph', patientsByRecruitmentGroupDateGraph)
  .name;
