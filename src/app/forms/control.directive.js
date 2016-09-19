import templateUrl from './control.html';

function frmControl() {
  return {
    require: ['^frmField', '?^frmLayout'],
    templateUrl: templateUrl,
    replace: true,
    transclude: true,
    scope: true,
    link: function(scope, element, attrs, ctrls) {
      var fieldCtrl = ctrls[0];
      var layoutCtrl = ctrls[1];

      scope.$watch(function() {
        return fieldCtrl.hasLabel();
      }, function(value) {
        scope.hasLabel = value;
      });

      scope.horizontal = !layoutCtrl || layoutCtrl.layout === 'horizontal';
    }
  };
}

export default frmControl;
