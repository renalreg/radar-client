import templateUrl from './text-editor-field.html';

function frmTextEditorField() {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    templateUrl: templateUrl
  };
}

export default frmTextEditorField;
