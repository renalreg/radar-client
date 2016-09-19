import _ from 'lodash';

import templateUrl from './hospital-field.html';

function frmRecruitPatientHospitalField(session, hospitalStore, sortHospitals, hasPermissionForGroup) {
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
        scope.hospitals = sortHospitals(hospitals);
      }
    }
  };
}

frmRecruitPatientHospitalField.$inject = ['session', 'hospitalStore', 'sortHospitals', 'hasPermissionForGroup'];

export default frmRecruitPatientHospitalField;
