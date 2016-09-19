import templateUrl from './integer-field.html';

function frmIntegerField() {
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

export default frmIntegerField;
