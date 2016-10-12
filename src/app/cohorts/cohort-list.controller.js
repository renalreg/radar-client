import sortGroups from '../groups/sort-groups';

/**
 * Controller for a list of cohorts.
 *
 * @class
 * @param {Object} $scope - angular scope.
 * @param {Object} session - injected session.
 * @param {Object} cohortStore - injected store.
 */
function CohortListController($scope, session, cohortStore) {
  $scope.loading = true;

  init();

  function setCohorts(cohorts) {
    $scope.cohorts = sortGroups(cohorts);
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
