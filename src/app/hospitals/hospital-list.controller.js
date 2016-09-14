function HospitalListController($scope, session, store, sortHospitals) {
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
    $scope.hospitals = sortHospitals(hospitals);
    $scope.loading = false;
  }
}

HospitalListController.$inject = ['$scope', 'session', 'store', 'sortHospitals'];

export default HospitalListController;
