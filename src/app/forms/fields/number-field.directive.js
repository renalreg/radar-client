import templateUrl from './number-field.html';

function frmNumberField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      units: '@'
    },
    templateUrl: templateUrl
  };
}

export default frmNumberField;
