import templateUrl from './email-field.html';

function frmEmailField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    template: templateUrl
  };
}

export default frmEmailField;
