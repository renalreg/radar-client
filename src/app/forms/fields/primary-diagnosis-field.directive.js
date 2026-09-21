import templateUrl from './primary-diagnosis-field.html';

function frmPrimaryDiagnosisField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      cohort: '='
    },
    template: templateUrl
  };
}

export default frmPrimaryDiagnosisField;
