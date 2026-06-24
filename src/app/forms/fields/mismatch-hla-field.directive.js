import templateUrl from './mismatch-hla-field.html';

function frmMismatchHlaField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    template: templateUrl
  };
}

export default frmMismatchHlaField;
