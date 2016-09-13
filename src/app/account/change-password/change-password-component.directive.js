import templateUrl from './change-password-component.html';

function changePasswordComponent(ChangePasswordController) {
  return {
    scope: {
      user: '='
    },
    controller: ChangePasswordController,
    templateUrl: templateUrl
  };
}

changePasswordComponent.$inject = ['ChangePasswordController'];

export default changePasswordComponent;