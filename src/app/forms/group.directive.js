import templateUrl from './group.html';

function frmGroup() {
  return {
    require: 'frmField',
    transclude: true,
    template: templateUrl,
    scope: {},
    link: function(scope, element, attrs, fieldCtrl) {
      scope.isRequired = function() {
        return fieldCtrl.isRequired();
      };
    }
  };
}

export default frmGroup;
