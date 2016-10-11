import sortCohorts from './sort-cohorts';

/** Controller for a list of cohorts. */
function CohortListController($scope, session, cohortStore) {
  $scope.loading = true;

  init();

  function setCohorts(cohorts) {
    $scope.cohorts = sortCohorts(cohorts);
    $scope.loading = false;
  }

  function init() {
    var user = session.user;

    if (user.isAdmin) {
      // Admins can see all cohorts
      cohortStore.findMany().then(function(cohorts) {
        setCohorts(cohorts);
      });
    } else {
      // Otherwise display the cohorts the user is a member of
      var cohorts = user.getCohorts();
      setCohorts(cohorts);
    }
  }
}

CohortListController.$inject = ['$scope', 'session', 'cohortStore'];

export default CohortListController;
