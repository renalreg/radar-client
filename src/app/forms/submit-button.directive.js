import templateUrl from './submit-button.html';

function submitButton() {
  return {
    require: ['^form', '?^submitIfValid'],
    scope: {},
    transclude: true,
    templateUrl: templateUrl,
    link: function(scope, element, attrs, ctrls) {
      var formCtrl = ctrls[0];
      var submitIfValidCtrl = ctrls[1];

      scope.formCtrl = formCtrl;
      scope.submitting = false;

      if (submitIfValidCtrl !== null) {
        submitIfValidCtrl.on('submit', function() {
          scope.submitting = true;
        });

        submitIfValidCtrl.on('submitted', function() {
          scope.submitting = false;
        });
      }
    }
  };
}

export default submitButton;
