import templateUrl from './group-inline.html';

function frmGroupInline() {
  return {
    require: 'frmField',
    transclude: true,
    templateUrl: templateUrl,
    scope: {},
    link: function(scope, element, attrs, fieldCtrl) {
      scope.isValid = function() {
        return fieldCtrl.isValid();
      };

      scope.isRequired = function() {
        return fieldCtrl.isRequired();
      };
    }
  };
}

export default frmGroupInline;
