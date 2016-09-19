import templateUrl from './email-field.html';

function frmEmailField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    templateUrl: templateUrl
  };
}

export default frmEmailField;
