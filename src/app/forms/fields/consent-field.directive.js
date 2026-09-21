import templateUrl from './consent-field.html';

function frmConsentField() {
  return {
    restrict: 'A',
    scope: {
      model: '='
    },
    transclude: true,
    template: templateUrl
  };
}

export default frmConsentField;
