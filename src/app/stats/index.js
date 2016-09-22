import angular from 'angular';

import groupRecruitmentGraph from './group-recruitment-graph.directive';
import patientsByGroupTable from './patients-by-group-table.directive';
import patientsByRecruitedGroupTable from './patients-by-recruited-group-table.directive';
import radarRecruitmentGraph from './radar-recruitment-graph.directive';
import recruitmentGraph from './recruitment-graph.directive';
import patientsByGroupDateGraph from './patients-by-group-date-graph.directive';

import templateUrl from './stats.html';

function config($stateProvider) {
  $stateProvider.state('stats', {
    url: '/stats',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.stats', [])
  .config(config)
  .directive('groupRecruitmentGraph', groupRecruitmentGraph)
  .directive('patientsByGroupTable', patientsByGroupTable)
  .directive('patientsByRecruitedGroupTable', patientsByRecruitedGroupTable)
  .directive('radarRecruitmentGraph', radarRecruitmentGraph)
  .directive('recruitmentGraph', recruitmentGraph)
  .directive('patientsByGroupDateGraph', patientsByGroupDateGraph)
  .name;
