import templateUrl from './diagnosis-field.html';

function frmDiagnosisField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      patient: '='
    },
    templateUrl: templateUrl
  };
}

export default frmDiagnosisField;
