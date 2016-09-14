import templateUrl from './text-field.html';

function frmTextField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    templateUrl: templateUrl
  };
}

export default frmTextField;
