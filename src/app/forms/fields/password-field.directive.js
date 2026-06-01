import templateUrl from './password-field.html';

function frmPasswordField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    template: templateUrl
  };
}

export default frmPasswordField;
