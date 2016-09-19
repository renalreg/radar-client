function crudListAppendButton() {
  return {
    scope: {
      action: '&'
    },
    template: '<button type="button" class="btn btn-success" ng-click="action()">Add</button>'
  };
}

export default crudListAppendButton;
