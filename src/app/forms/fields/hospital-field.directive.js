import sortGroups from '../../groups/sort-groups';

import templateUrl from './hospital-field.html';

function frmHospitalField(session, hospitalStore) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      params: '='
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.$watch(function() {
        return session.user;
      }, function(user) {
        if (user) {
          setHospitals([]);
          hospitalStore.findMany(scope.params).then(setHospitals);
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
