import templateUrl from './date-field.html';

function frmDateField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      minDate: '=',
      maxDate: '=',
      defaultDate: '='
    },
    templateUrl: templateUrl
  };
}

export default frmDateField;
