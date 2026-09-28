import templateUrl from './weeks-and-days-field.html';

function frmWeeksAndDaysField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    template: templateUrl
  };
}

export default frmWeeksAndDaysField;
