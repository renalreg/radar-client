import templateUrl from './change-email-component.html';

function changeEmailComponent(ChangeEmailController) {
  return {
    scope: {
      user: '='
    },
    controller: ChangeEmailController,
    templateUrl: templateUrl
  };
}

changeEmailComponent.$inject = ['ChangeEmailController'];

export default changeEmailComponent;