import templateUrl from './login-form.html';

function loginFormDirective(
  session, authService, notificationService, loginRedirect
) {
  return {
    restrict: 'A',
    scope: {},
    templateUrl: templateUrl,
    link: function(scope) {
      var credentials = {
        username: '',
        password: '',
        // Don't logout other sessions by default
        logoutOtherSessions: false
      };

      scope.credentials = credentials;

      scope.errors = {};

      scope.login = function() {
        scope.errors = {};

        return authService.login(credentials)
          .then(function() {
            notificationService.success('Logged in successfully.');
            loginRedirect(session.user);
          })
          .catch(function(errors) {
            if (errors) {
              scope.errors = errors;
            }
          });
      };
    }
  };
}

loginFormDirective.$inject = [
  'session', 'authService', 'notificationService', 'loginRedirect'
];

export default loginFormDirective;
