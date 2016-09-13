import templateUrl from './account-component.html';

function accountComponent() {
  return {
    scope: {
      user: '='
    },
    controller: AccountController,
    templateUrl: templateUrl
  };
}

accountComponent.$inject = ['AccountController'];

export default accountComponent;
