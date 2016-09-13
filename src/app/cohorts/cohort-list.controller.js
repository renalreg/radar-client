import _ from 'lodash';

function CohortListController($scope, session, cohortStore, sortCohorts) {
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
      var cohorts = user.getCohorts();
      setCohorts(cohorts);
    }
  }
}

CohortListController.$inject = ['$scope', 'session', 'cohortStore', 'sortCohorts'];

export default CohortListController;