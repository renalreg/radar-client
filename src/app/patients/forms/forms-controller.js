import _ from 'lodash';

function FormsController($scope, forms, patient, $state) {
  // Sort by name
  forms = _.sortBy(forms, 'form.name');

  $scope.forms = forms;

  /** Redirect to first form. */
  function redirect() {
    if ($state.current.name !== 'patient.forms.form' && forms.length) {
      $state.go('patient.forms.form', {formId: forms[0].form.id});
    }
  }

  /** Update the number of entries for a form. */
  function updateCount(id, count) {
    for (var i = 0; i < $scope.forms.length; i++) {
      var form = $scope.forms[i];

      if (form.form.id === id) {
        form.count = count;
      }
    }
  }

  // When transitioning into this state redirect to the first
  // available form (if available)
  redirect();
  $scope.$on('$stateChangeSuccess', redirect);

  $scope.$on('entryCount', function(event, data) {
    // Ignore updates for other patients
    if (data.patient.id !== patient.id) {
      return;
    }

    updateCount(data.form.id, data.count);
  });
}

FormsController.$inject = ['$scope', 'forms', 'patient', '$state'];

export default FormsController;
