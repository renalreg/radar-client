function consentValidator() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$setValidity('consent', ngModelCtrl.$viewValue);

      ngModelCtrl.$parsers.push(function(viewValue) {
        ngModelCtrl.$setValidity('consent', viewValue);
        return viewValue;
      });
    }
  };
}

export default consentValidator;
