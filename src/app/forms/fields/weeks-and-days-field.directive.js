import templateUrl from './weeks-and-days-field.html';

function frmWeeksAndDaysField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    templateUrl: templateUrl
  };
}

export default frmWeeksAndDaysField;
