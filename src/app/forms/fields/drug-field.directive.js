import templateUrl from './drug-field.html';

function frmDrugField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl
  };
}

export default frmDrugField;
