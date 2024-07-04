import templateUrl from './mismatch-hla-field.html';

function frmMismatchHlaField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl
  };
}

export default frmMismatchHlaField;
