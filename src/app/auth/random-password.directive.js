import templateUrl from './random-password.html';

function randomPasswordDirective(randomPassword) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: true,
    templateUrl: templateUrl,
    link: function(scope, element, attrs, ngModel) {
      scope.loading = false;

      scope.generate = function() {
        scope.loading = true;

        randomPassword()
          .then(function(password) {
            scope.password = password;
            ngModel.$setViewValue(password);
          })
          .finally(function() {
            scope.loading = false;
          });
      };
    }
  };
}

randomPasswordDirective.$inject = ['randomPassword'];

export default randomPasswordDirective;
