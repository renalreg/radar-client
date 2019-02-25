
import templateUrl from './hla-field.html';

function frmHlaField() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      required: '&'
    },
    templateUrl: templateUrl
    // link: function(scope) {
    //   scope.lostFocus = function(event) {
    //     const input = event.target;
    //     const parts = input.value.match(/[a]\d{1,2}\/?|[b]\d{1,3}\/?|dr\d{1,3}/gi);
    //   };
    // }
  };
}

// frmSystemField.$inject = ['session', 'systemStore'];

export default frmHlaField;
