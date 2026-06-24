import templateUrl from './drug-field.html';

function frmDrugField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    template: templateUrl
  };
}

export default frmDrugField;
