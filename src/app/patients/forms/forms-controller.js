(function() {
  'use strict';

  var app = angular.module('radar.patients.forms');

  app.controller('FormsController', ['$scope', 'forms', 'patient', '$state', '_',  function($scope, forms, patient, $state, _) {
    // Sort by name
    forms = _.sortBy(forms, 'form.name');

    $scope.forms = forms;

    // Redirect to first form
    if ($state.current.name !== 'patient.forms.form' && forms.length) {
      $state.go('patient.forms.form', {formId: forms[0].form.id});
    }

    function updateCount(id, count) {
      for (var i = 0; i < $scope.forms.length; i++) {
        var form = $scope.forms[i];

        if (form.form.id === id) {
          form.count = count;
        }
      }
    }

    $scope.$on('entryCount', function(event, data) {
      // Ignore updates for other patients
      if (data.patient.id !== patient.id) {
        return;
      }

      updateCount(data.form.id, data.count);
    });
  }]);
})();
