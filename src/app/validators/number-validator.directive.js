var NUMBER_REGEX = /^[+-]?[0-9]+(\.[0-9]+)?$/;

function numberValidator() {
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
          } else if (NUMBER_REGEX.test(modelValue)) {
            modelValue = parseFloat(modelValue);
            valid = true;
          } else {
            modelValue = null;
            valid = false;
          }
        }

        ngModelCtrl.$setValidity('number', valid);

        return modelValue;
      });
    }
  };
}

export default numberValidator;
