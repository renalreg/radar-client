function crudViewButton() {
  return {
    require: '^crud',
    scope: {
      item: '='
    },
    template: '<button ng-click="action()" ng-disabled="!enabled" type="button" class="btn btn-default">View</button>',
    link: function(scope, element, attrs, crudCtrl) {
      scope.action = function() {
        crudCtrl.view(scope.item);
      };

      scope.$watch(function() {
        return crudCtrl.viewEnabled(scope.item);
      }, function(value) {
        scope.enabled = value;
      });
    }
  };
}

export default crudViewButton;
