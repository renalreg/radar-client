import templateUrl from './text-field.html';

function frmTextField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      maxlength: '@?'
    },
    template: templateUrl
  };
}

export default frmTextField;
