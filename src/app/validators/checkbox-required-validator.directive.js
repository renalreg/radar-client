function checkboxRequiredValidator() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {

      ngModelCtrl.$setValidity('ticked', ngModelCtrl.$viewValue);

      ngModelCtrl.$parsers.push(function(viewValue) {
        ngModelCtrl.$setValidity('ticked', viewValue);
        return viewValue;
      });
    }
  };
}

export default checkboxRequiredValidator;
