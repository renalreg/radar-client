import templateUrl from './hla-field.html';

function frmHlaField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    template: templateUrl
  };
}

export default frmHlaField;
