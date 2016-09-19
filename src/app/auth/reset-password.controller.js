var MESSAGE = 'Your password has been reset, you can now login with your new password.';

function ResetPasswordController(
  $scope, $state, authService, $stateParams, notificationService
) {
  $scope.errors = {};
  $scope.data = {};

  var token = $stateParams.token;

  $scope.submit = function() {
    $scope.errors = {};

    return authService.resetPassword(token, $scope.data.username, $scope.data.password)
      .then(function() {
        notificationService.success({message: MESSAGE, timeout: 30000});
        $state.go('login');
      })
      .catch(function(errors) {
        if (errors) {
          $scope.errors = errors;
        }

        // Token is invalid / has expired
        if (errors.token) {
          notificationService.fail({message: errors.token, timeout: 30000});
          $state.go('forgotPassword');
        }
      });
  };
}

ResetPasswordController.$inject = [
  '$scope', '$state', 'authService', '$stateParams', 'notificationService'
];

export default ResetPasswordController;
