var ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

function alphanumericValidator() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: false,
    link: function(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$parsers.push(function(viewValue) {
        var modelValue;
        var valid;

        if (viewValue === undefined || viewValue === null) {
          modelValue = null;
          valid = true;
        } else {
          modelValue = viewValue.trim();

          if (modelValue.length === 0) {
            modelValue = null;
            valid = true;
          } else if (ALPHANUMERIC_REGEX.test(modelValue)) {
            modelValue = modelValue;
            valid = true;
          } else {
            modelValue = null;
            valid = false;
          }
        }

        ngModelCtrl.$setValidity('alphanumeric', valid);

        return modelValue;
      });
    }
  };
}

export default alphanumericValidator;
