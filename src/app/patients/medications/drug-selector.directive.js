import templateUrl from './drug-selector.html';

/**
 * User interface for selecting drugs/medications.
 *
 * @param {Object} store - injected store.
 * @returns {Object} - a directive.
 */
function drugSelector(store) {
  return {
    require: 'ngModel',
    templateUrl: templateUrl,
    link: function(scope, element, attrs, ngModel) {
      // Currently selected drug
      scope.drug = null;

      // True while the data is loading
      scope.loading = true;

      // Add functions to scope
      scope.use = use;
      scope.drop = drop;

      /**
       * Called when the model is updated outside of the directive.
       *
       * @returns {undefined}
       */
      ngModel.$render = function() {
        scope.drug = ngModel.$viewValue;
      };

      load();

      /**
       * Select a drug.
       *
       * @param {Object} drug - drug to select.
       * @returns {undefined}
       */
      function use(drug) {
        update(drug);
      }

      /**
       * Deselect the drug.
       *
       * @returns {undefined}
       */
      function drop() {
        update(null);
      }

      /**
       * Update the selected drug.
       *
       * @param {Object} drug - drug to select.
       * @returns {undefined}
       */
      function update(drug) {
        scope.drug = drug;

        // Update the model value
        ngModel.$setViewValue(drug);
      }

      /**
       * Load the list of drugs.
       *
       * @returns {undefined}
       */
      function load() {
        store.findMany('drugs').then(function(drugs) {
          scope.drugs = drugs;

          // Finished loading
          scope.loading = false;
        });
      }
    }
  };
}

drugSelector.$inject = ['store'];

export default drugSelector;
