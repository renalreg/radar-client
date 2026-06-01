import templateUrl from './textarea-field.html';

function frmTextareaField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      rows: '@'
    },
    template: templateUrl
  };
}

export default frmTextareaField;
