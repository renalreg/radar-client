import templateUrl from './hla-field.html';

function frmHlaField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl
  };
}

export default frmHlaField;
