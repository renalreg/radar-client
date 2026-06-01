import templateUrl from './confirm-email-field.html';

function frmConfirmEmailField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      email: '='
    },
    template: templateUrl
  };
}

export default frmConfirmEmailField;
