import angular from 'angular';

import adminPermissionFactory from './admin-permission';
import denyPermissionFactory from './deny-permission';
import grantPermissionFactory from './grant-permission';
import hasPermissionFactory from './has-permission';
import hasPermissionForGroupFactory from './has-permission-for-group';
import hasPermissionForPatientFactory from './has-permission-for-patient';
import hasPermissionForUserFactory from './has-permission-for-user';
import patientObjectPermissionFactory from './patient-object-permission';
import patientRadarObjectPermissionFactory from './patient-radar-object-permission';
import patientSourceObjectPermissionFactory from './patient-source-object-permission';
import permissionChainFactory from './permission-chain';
import radarObjectPermissionFactory from './radar-object-permission';
import sourceObjectPermissionFactory from './source-object-permission';

export default angular.module('radar.permissions', [])
  .factory('AdminPermission', adminPermissionFactory)
  .factory('DenyPermission', denyPermissionFactory)
  .factory('GrantPermission', grantPermissionFactory)
  .factory('hasPermission', hasPermissionFactory)
  .factory('hasPermissionForGroup', hasPermissionForGroupFactory)
  .factory('hasPermissionForPatient', hasPermissionForPatientFactory)
  .factory('hasPermissionForUser', hasPermissionForUserFactory)
  .factory('PatientObjectPermission',patientObjectPermissionFactory)
  .factory('PatientRadarObjectPermission', patientRadarObjectPermissionFactory)
  .factory('PatientSourceObjectPermission', patientSourceObjectPermissionFactory)
  .factory('permissionChain', permissionChainFactory)
  .factory('RadarObjectPermission', radarObjectPermissionFactory)
  .factory('SourceObjectPermission', sourceObjectPermissionFactory)
  .name;
