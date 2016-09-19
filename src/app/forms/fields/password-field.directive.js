import templateUrl from './password-field.html';

function frmPasswordField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    templateUrl: templateUrl
  };
}

export default frmPasswordField;
