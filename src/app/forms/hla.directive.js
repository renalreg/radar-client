function frmHla() {
  return {
    require: 'ngModel',
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function(scope, element, attrs, ngModel) {
      scope.hla = {
        a: null,
        b: null,
        dr: null
      };

      ngModel.$render = function() {
        var value = ngModel.$viewValue;

        if (value === null || value === undefined) {
          scope.hla.a = null;
          scope.hla.b = null;
          scope.hla.dr = null;
        } else {
          var parts = value.split('/');
          scope.hla.a = parts[0].substring(1);
          scope.hla.b = parts[1].substring(1);
          scope.hla.dr = parts[2].substring(2);
        }
      };

      scope.$watch('hla.a', update);
      scope.$watch('hla.b', update);
      scope.$watch('hla.dr', update);

      function update() {
        var a = parseInt(scope.hla.a);
        var b = parseInt(scope.hla.b);
        var dr = parseInt(scope.hla.dr);
        let value = null;
        if (a >= 0 && b >= 0 && dr >= 0) {
          value = 'A' + a + '/B' + b + '/DR' + dr;
        // } else if (a >= 0 || b >= 0 || dr >= 0)  {
        //   ngModel.$setValidity('hla', false);
        } else {
          value = null;
        }

        ngModel.$setViewValue(value);

        if (value === null && (ngModel.$viewValue === undefined || ngModel.$viewValue === null)) {
          ngModel.$setPristine();
        }
      }
    }
  };
}

export default frmHla;
