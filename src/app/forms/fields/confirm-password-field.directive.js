import templateUrl from './confirm-password-field.html';

function frmConfirmPasswordField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      password: '='
    },
    templateUrl: templateUrl
  };
}

export default frmConfirmPasswordField;
