function QuestionnairesController($scope, forms, patient, $state, cohort) {
  $scope.cohort = cohort;
  $scope.forms = forms;

  /**
   * Redirect to first form.
   *
   * @returns {undefined}
   */
  function redirect() {
    if ($state.current.name !== 'patient.questionnaire' && forms.length) {
      $state.go('patient.questionnaire', {formSlug: forms[0].form.slug});
    }
  }

  /**
   * Update the number of entries for a form.
   *
   * @param {number} id - id of the form to update.
   * @param {number} count - number of entries for this form.
   * @returns {undefined}
   */
  function updateCount(id, count) {
    for (var i = 0; i < $scope.forms.length; i++) {
      var form = $scope.forms[i];

      // Found the form to update
      if (form.form.id === id) {
        form.count = count;
      }
    }
  }

  // When transitioning into this state redirect to the first
  // available form (if any).
  redirect();
  $scope.$on('$stateChangeSuccess', redirect);

  $scope.$on('entryCount', function(event, data) {
    // Ignore updates for other patients
    if (data.patient.id !== patient.id) {
      return;
    }

    // Update the entry count for this form
    updateCount(data.form.id, data.count);
  });
}

QuestionnairesController.$inject = ['$scope', 'forms', 'patient', '$state', 'cohort'];

export default QuestionnairesController;
