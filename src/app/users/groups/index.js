import angular from 'angular';

import getGroupRoles from './get-group-roles';
import {
  userGroupPermissionFactory,
  userGroupsControllerFactory,
  userGroupsComponent
} from './groups-component.directive';

export default angular.module('radar.users.groups', [])
  .factory('getGroupRoles', getGroupRoles)
  .factory('UserGroupPermission', userGroupPermissionFactory)
  .factory('UserGroupsController', userGroupsControllerFactory)
  .directive('userGroupsComponent', userGroupsComponent)
  .name;
