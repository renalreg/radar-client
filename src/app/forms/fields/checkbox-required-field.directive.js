import templateUrl from './checkbox-required-field.html';

function frmCheckboxRequiredField() {
  return {
    restrict: 'A',
    scope: {
      model: '='
    },
    transclude: true,
    templateUrl: templateUrl
  };
}

export default frmCheckboxRequiredField;
