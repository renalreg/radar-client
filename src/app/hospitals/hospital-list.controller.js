import sortGroups from '../groups/sort-groups';

function HospitalListController($scope, session, store) {
  $scope.loading = true;

  var user = session.user;

  if (user.isAdmin) {
    store.findMany('groups', {type: 'HOSPITAL'}).then(function(hospitals) {
      setHospitals(hospitals);
    });
  } else {
    var hospitals = user.getHospitals();
    setHospitals(hospitals);
  }

  function setHospitals(hospitals) {
    $scope.hospitals = sortGroups(hospitals);
    $scope.loading = false;
  }
}

HospitalListController.$inject = ['$scope', 'session', 'store'];

export default HospitalListController;
