import templateUrl from './filter-helper.html';

function filterHelper() {
  return {
    require: '^listHelper',
    scope: {},
    templateUrl: templateUrl,
    link: function(scope, element, attrs, listHelperCtrl) {
      scope.search = '';

      scope.$watch('search', function(value) {
        listHelperCtrl.filter(value);
      });

      scope.clear = function() {
        scope.search = '';
        listHelperCtrl.filter('');
      };
    }
  };
}

export default filterHelper;
