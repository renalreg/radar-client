import templateUrl from './diagnosis-field.html';

function frmDiagnosisField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      patient: '='
    },
    template: templateUrl
  };
}

export default frmDiagnosisField;
