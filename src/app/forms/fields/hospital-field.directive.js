import sortGroups from '../../groups/sort-groups';

import templateUrl from './hospital-field.html';

function frmHospitalField(session, hospitalStore) {
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
        if (user) {
          if (user.isAdmin) {
            setHospitals([]);
            hospitalStore.findMany().then(setHospitals);
          } else {
            var hospitals = user.getHospitals();
            setHospitals(hospitals);
          }
        } else {
          setHospitals([]);
        }
      });

      function setHospitals(hospitals) {
        scope.hospitals = sortGroups(hospitals);
      }
    }
  };
}

frmHospitalField.$inject = ['session', 'hospitalStore'];

export default frmHospitalField;
