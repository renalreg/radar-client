import angular from 'angular';

import getRadarGroup from './get-radar-group';
import groupUserModelFactory from './group-user-model';
import sortGroups from './sort-groups';

function config(storeProvider) {
  storeProvider.registerModel('group-users', 'GroupUserModel');
}

config.$inject = ['storeProvider'];

export default angular.module('radar.groups', [])
  .config(config)
  .factory('getRadarGroup', getRadarGroup)
  .factory('GroupUserModel', groupUserModelFactory)
  .factory('sortGroups', sortGroups)
  .name;
