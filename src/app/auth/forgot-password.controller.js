var MESSAGE = 'If you have provided a valid email and username we will send you an email.';

function ForgotPasswordController(
  $scope, $state, authService, notificationService
) {
  $scope.errors = {};
  $scope.data = {};
  $scope.submit = submit;

  function submit() {
    $scope.errors = {};

    return authService.forgotPassword($scope.data.username, $scope.data.email)
      .then(function() {
        notificationService.info({message: MESSAGE, timeout: 30000});

        // Redirect the login page
        $state.go('login');
      })
  }
}

ForgotPasswordController.$inject = [
  '$scope', '$state', 'authService', 'notificationService'
];

export default ForgotPasswordController;
