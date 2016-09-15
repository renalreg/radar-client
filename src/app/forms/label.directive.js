import templateUrl from './label.html';

function frmLabel() {
  return {
    require: ['^frmField', '?^frmLayout'],
    templateUrl: templateUrl,
    replace: true,
    transclude: true,
    link: function(scope, element, attrs, ctrls) {
      var fieldCtrl = ctrls[0];
      var layoutCtrl = ctrls[1];
      fieldCtrl.registerLabel();
      scope.horizontal = !layoutCtrl || layoutCtrl.layout === 'horizontal';
    }
  };
}

export default frmLabel;
