import templateUrl from './text-editor-field.html';

function frmTextEditorField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    template: templateUrl
  };
}

export default frmTextEditorField;
