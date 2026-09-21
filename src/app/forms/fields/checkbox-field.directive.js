import templateUrl from './checkbox-field.html';

function frmCheckboxField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      disabled: '=',
      checked: '=',
      required: '&'
    },
    transclude: true,
    template: templateUrl
  };
}

export default frmCheckboxField;
