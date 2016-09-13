function crudListButton() {
  return {
    require: '^crud',
    scope: {},
    template: '<button ng-click="action()" ng-disabled="!enabled" type="button" class="btn btn-default">List</button>',
    link: function(scope, element, attrs, crudCtrl) {
      scope.action = function() {
        crudCtrl.list();
      };

      scope.$watch(function() {
        return crudCtrl.listEnabled();
      }, function(value) {
        scope.enabled = value;
      });
    }
  };
}

export default crudListButton;
