import templateUrl from './text-field.html';

function frmTextField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      maxlength: '@?'
    },
    templateUrl: templateUrl
  };
}

export default frmTextField;
