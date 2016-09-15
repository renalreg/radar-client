import templateUrl from './buttons.html';

function frmButtons() {
  return {
    require: '?^frmLayout',
    templateUrl: templateUrl,
    transclude: true,
    link: function(scope, element, attrs, layoutCtrl) {
      scope.horizontal = !layoutCtrl || layoutCtrl.layout === 'horizontal';
    }
  };
}

export default frmButtons;
