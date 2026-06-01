import templateUrl from './checkbox-required-field.html';

function frmCheckboxRequiredField() {
  return {
    restrict: 'A',
    scope: {
      model: '='
    },
    transclude: true,
    template: templateUrl
  };
}

export default frmCheckboxRequiredField;
