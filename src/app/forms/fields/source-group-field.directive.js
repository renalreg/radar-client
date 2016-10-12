import _ from 'lodash';

import sortGroups from '../../groups/sort-groups';

import templateUrl from './source-group-field.html';

function frmSourceGroupField(store, session) {
  return {
    restrict: 'A',
    scope: {
      patient: '=',
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      var user = session.user;
      var isAdmin = user.isAdmin;

      var groupIds = [];

      if (!isAdmin) {
        var userGroups = user.groups;

        _.forEach(userGroups, function(userGroup) {
          if (userGroup.hasPermission('EDIT_PATIENT')) {
            groupIds.push(userGroup.group.id);
          }
        });
      }

      var patientGroups = scope.patient.groups;
      var sourceGroups = [];

      _.forEach(patientGroups, function(patientGroup) {
        if (
          (patientGroup.group.type === 'SYSTEM') ||
          (patientGroup.group.type === 'HOSPITAL' && (isAdmin || groupIds.indexOf(patientGroup.group.id) >= 0))
        ) {
          sourceGroups.push(patientGroup.group);
        }
      });

      sourceGroups = sortGroups(sourceGroups);

      if (!scope.model) {
        scope.model = sourceGroups[0];
      }

      scope.sourceGroups = sourceGroups;
    }
  };
}

frmSourceGroupField.$inject = ['store', 'session'];

export default frmSourceGroupField;
