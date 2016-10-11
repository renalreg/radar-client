/**
 * Controller for a single cohort.
 *
 * @class
 * @param {Object} $scope - angular scope.
 * @param {Object} cohort - a cohort.
 */
function CohortDetailController($scope, cohort) {
  $scope.cohort = cohort;
}

CohortDetailController.$inject = ['$scope', 'cohort'];

export default CohortDetailController;
