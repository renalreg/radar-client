function HospitalDetailController($scope, hospital) {
  $scope.hospital = hospital;
}

HospitalDetailController.$inject = ['$scope', 'hospital'];

export default HospitalDetailController;
