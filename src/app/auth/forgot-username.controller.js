var MESSAGE = 'If you provided a valid email address we will have sent you an email';

function ForgotUsernameController(
  $scope, $state, authService, notificationService
) {
  $scope.errors = {};
  $scope.data = {};
  $scope.submit = submit;

  function submit() {
    $scope.errors = {};

    return authService.forgotUsername($scope.data.email)
      .then(function() {
        notificationService.info({message: MESSAGE, timeout: 30000});

        // Redirect the login page
        $state.go('login');
      })
  };
}

ForgotUsernameController.$inject = [
  '$scope', '$state', 'authService', 'notificationService'
];

export default ForgotUsernameController;
