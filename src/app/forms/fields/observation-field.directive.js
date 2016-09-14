import templateUrl from './observation-field.html';

function frmObservationField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&',
      patient: '='
    },
    templateUrl: templateUrl
  };
}

export default frmObservationField;
