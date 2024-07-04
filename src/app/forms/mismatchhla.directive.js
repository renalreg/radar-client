
function frmMismatchHla() {
  return {
    require: 'ngModel',
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function(scope, element, attrs, ngModel) {
      scope.hla = {
        a1: null,
        b1: null,
        dr1: null,
      };

      ngModel.$render = function() {
        var value = ngModel.$viewValue;

        if (value === null || value === undefined) {
          scope.hla.a1 = null;
          scope.hla.b1 = null;
          scope.hla.dr1 = null;
        } else {
          var parts = value.split('/');
          scope.hla.a1 = parts[0].substring(1);
          scope.hla.b1 = parts[1].substring(1);
          scope.hla.dr1 = parts[2].substring(2);
        }
      };

      scope.$watch('hla.a1', update);
      scope.$watch('hla.b1', update);
      scope.$watch('hla.dr1', update);

      function update() {
        var a1 = scope.hla.a1;
        var b1 = scope.hla.b1;
        var dr1 = scope.hla.dr1;
        let value = null;
        if ((a1 !== null && String(a1).length > 0) ||
          (b1 !== null && String(b1).length > 0) ||
          (dr1 !== null && String(dr1).length > 0)) {
          value = 'A' + a1 + '/B' + b1 + '/DR' + dr1;
          console.log(value)
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

export default frmMismatchHla;
