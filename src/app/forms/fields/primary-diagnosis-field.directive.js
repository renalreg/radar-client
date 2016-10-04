import templateUrl from './primary-diagnosis-field.html';

function frmPrimaryDiagnosisField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      cohort: '='
    },
    templateUrl: templateUrl
  };
}

export default frmPrimaryDiagnosisField;
