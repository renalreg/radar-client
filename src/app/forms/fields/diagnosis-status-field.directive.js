import templateUrl from './diagnosis-status-field.html';

function frmDiagnosisStatusField() {
  return {
    restrict: 'A',
    scope: {
      model: '='
    },
    templateUrl: templateUrl
  };
}

export default frmDiagnosisStatusField;
