import templateUrl from './error.html';

function frmError() {
  return {
    require: '^frmErrors',
    templateUrl: templateUrl,
    transclude: true,
    scope: {
      key: '@',
      isDefault: '@'
    },
    link: function(scope, element, attrs, errorsCtrl) {
      var isDefault = scope.isDefault === 'true';

      if (!isDefault) {
        errorsCtrl.override(scope.key);
      }

      scope.showError = function() {
        if (scope.key) {
          return errorsCtrl.showError(scope.key, isDefault);
        } else {
          return true;
        }
      };
    }
  };
}

export default frmError;
