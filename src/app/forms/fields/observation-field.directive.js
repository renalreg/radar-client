import templateUrl from './observation-field.html';

function frmObservationField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      patient: '='
    },
    template: templateUrl
  };
}

export default frmObservationField;
