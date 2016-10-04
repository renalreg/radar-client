import templateUrl from './drug-selector.html';

function drugSelector(store) {
  return {
    require: 'ngModel',
    templateUrl: templateUrl,
    link: function(scope, element, attrs, ngModel) {
      scope.drug = null;

      store.findMany('drugs').then(function(drugs) {
        scope.drugs = drugs;
      });

      ngModel.$render = function() {
        scope.drug = ngModel.$viewValue;
      };

      scope.use = function(drug) {
        update(drug);
      };

      scope.drop = function() {
        update(null);
      };

      function update(drug) {
        scope.drug = drug;
        ngModel.$setViewValue(drug);
      }
    }
  };
}

drugSelector.$inject = ['store'];

export default drugSelector;
