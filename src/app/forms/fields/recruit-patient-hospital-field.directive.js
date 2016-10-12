import _ from 'lodash';

import sortGroups from '../../groups/sort-groups';

import templateUrl from './hospital-field.html';

function frmRecruitPatientHospitalField(session, hospitalStore, hasPermissionForGroup) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.$watch(function() {
        return session.user;
      }, function(user) {
        setHospitals([]);

        hospitalStore.findMany().then(function(hospitals) {
          hospitals = _.filter(hospitals, function(x) {
            return hasPermissionForGroup(user, x, 'RECRUIT_PATIENT', true);
          });

          setHospitals(hospitals);
        });
      });

      function setHospitals(hospitals) {
        scope.hospitals = sortGroups(hospitals);
      }
    }
  };
}

frmRecruitPatientHospitalField.$inject = ['session', 'hospitalStore', 'hasPermissionForGroup'];

export default frmRecruitPatientHospitalField;
