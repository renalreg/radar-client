import templateUrl from './textarea-field-restricted.html';

function frmTextareaField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      rows: '@'
    },
    templateUrl: templateUrl
  };
}

export default frmTextareaField;
