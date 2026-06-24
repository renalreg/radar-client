import templateUrl from './confirm-password-field.html';

function frmConfirmPasswordField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      password: '='
    },
    template: templateUrl
  };
}

export default frmConfirmPasswordField;
