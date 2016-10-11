/** Controller for a single cohort. */
function CohortDetailController($scope, cohort) {
  $scope.cohort = cohort;
}

CohortDetailController.$inject = ['$scope', 'cohort'];

export default CohortDetailController;
