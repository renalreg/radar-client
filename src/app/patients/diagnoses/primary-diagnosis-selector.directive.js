import _ from 'lodash';

import templateUrl from './primary-diagnosis-selector.html';

/** User interface for choosing a primary diagnosis from a list. */
function primaryDiagnosisSelector(store) {
  return {
    require: 'ngModel',
    templateUrl: templateUrl,
    scope: {
      cohort: '='
    },
    link: function(scope, element, attrs, ngModel) {
      // Currently selected diagnosis
      scope.diagnosis = null;

      // True while the data is loading
      scope.loading = true;

      // Add functions to scope
      scope.use = use;
      scope.drop = drop;

      /** Called when the model is updated outside the directive. */
      ngModel.$render = function() {
        scope.diagnosis = ngModel.$viewValue;
      };

      load();

      /** Select a diagnosis. */
      function use(diagnosis) {
        update(diagnosis);
      }

      /** Deselect the diagnosis. */
      function drop() {
        update(null);
      }

      /** Update the selected diagnosis. */
      function update(diagnosis) {
        scope.diagnosis = diagnosis;

        // Update the model
        ngModel.$setViewValue(diagnosis);
      }

      /** Load the list of primary diagnoses. */
      function load() {
        store.findMany('diagnoses', {primaryGroup: scope.cohort.id}).then(function(diagnoses) {
          scope.diagnoses = _.map(diagnoses, function(x) {
            return {
              diagnosis: x,
              edtaCode: x.getEdtaCode(),
              weight: [x.getWeight(scope.cohort.id), x.name]
            };
          });

          // Finished loading
          scope.loading = false;
        });
      }
    }
  };
}

primaryDiagnosisSelector.$inject = ['store'];

export default primaryDiagnosisSelector;
