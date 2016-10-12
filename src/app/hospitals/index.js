import angular from 'angular';

import stats from '../stats';

import hospitalStore from './hospital-store';
import HospitalDetailController from './hospital-detail.controller';
import HospitalListController from './hospital-list.controller';

import hospitalListTemplateUrl from './hospital-list.html';
import hospitalDetailTemplateUrl from './hospital-detail.html';

function config($stateProvider) {
  $stateProvider.state('hospitals', {
    url: '/hospitals',
    templateUrl: hospitalListTemplateUrl,
    controller: 'HospitalListController'
  });

  $stateProvider.state('hospital', {
    url: '/hospitals/:hospitalId',
    templateUrl: hospitalDetailTemplateUrl,
    controller: 'HospitalDetailController',
    resolve: {
      hospital: ['$stateParams', 'store', '$q', function($stateParams, store, $q) {
        return store.findOne('groups', $stateParams.hospitalId, true).then(function(group) {
          if (group.type === 'HOSPITAL') {
            return group;
          } else {
            return $q.reject();
          }
        });
      }]
    }
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.hospitals', [stats])
  .config(config)
  .controller('HospitalDetailController', HospitalDetailController)
  .controller('HospitalListController', HospitalListController)
  .factory('hospitalStore', hospitalStore)
  .name;
