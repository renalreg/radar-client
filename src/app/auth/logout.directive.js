function logoutDirective(authService, $state) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      // Log the user out on click
      element.on('click', function() {
        // $apply is used to execute an expression from outside of angular
        scope.$apply(function() {
          authService.logout();

          // Redirect to the login page
          $state.go('login');
        });
      });
    }
  };
}

logoutDirective.$inject = ['authService', '$state'];

export default logoutDirective;
