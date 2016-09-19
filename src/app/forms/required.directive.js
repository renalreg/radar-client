function frmRequired($parse) {
  return {
    require: '^frmField',
    link: function(scope, element, attrs, fieldCtrl) {
      var requiredGetter = null;

      attrs.$observe('ngRequired', function(value) {
        requiredGetter = $parse(value);
      });

      scope.$watch(function() {
        return requiredGetter !== null && requiredGetter(scope) === true;
      }, function(value) {
        fieldCtrl.setRequired(value);
      });
    }
  };
}

frmRequired.$inject = ['$parse'];

export default frmRequired;
