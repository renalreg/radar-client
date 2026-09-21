import templateUrl from './number-field.html';

function frmNumberField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      units: '@'
    },
    template: templateUrl
  };
}

export default frmNumberField;
