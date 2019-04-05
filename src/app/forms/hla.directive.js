function frmHla() {
  return {
    require: 'ngModel',
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function(scope, element, attrs, ngModel) {
      scope.hla = {
        a1: null,
        a2: null,
        b1: null,
        b2: null,
        dr1: null,
        dr2: null
      };

      ngModel.$render = function() {
        var value = ngModel.$viewValue;

        if (value === null || value === undefined) {
          scope.hla.a1 = null;
          scope.hla.a2 = null;
          scope.hla.b1 = null;
          scope.hla.b2 = null;
          scope.hla.dr1 = null;
          scope.hla.dr2 = null;
        } else {
          var parts = value.split('/');
          scope.hla.a1 = parts[0].substring(1);
          scope.hla.a2 = parts[1].substring(1);
          scope.hla.b1 = parts[2].substring(1);
          scope.hla.b2 = parts[3].substring(1);
          scope.hla.dr1 = parts[4].substring(2);
          scope.hla.dr2 = parts[5].substring(2);
        }
      };

      scope.$watch('hla.a1', update);
      scope.$watch('hla.a2', update);
      scope.$watch('hla.b1', update);
      scope.$watch('hla.b2', update);
      scope.$watch('hla.dr1', update);
      scope.$watch('hla.dr2', update);

      function update() {
        var a1 = parseInt(scope.hla.a1);
        var a2 = parseInt(scope.hla.a2);
        var b1 = parseInt(scope.hla.b1);
        var b2 = parseInt(scope.hla.b2);
        var dr1 = parseInt(scope.hla.dr1);
        var dr2 = parseInt(scope.hla.dr2);
        let value = null;
        if (a1 >= 0 && b1 >= 0 && dr1 >= 0 && a2 >= 0 && b2 >= 0 && dr2 >= 0) {
          value = 'A' + a1 + '/A' + a2 + '/B' + b1 + '/B' + b2 + '/DR' + dr1 + '/DR' + dr2;
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
