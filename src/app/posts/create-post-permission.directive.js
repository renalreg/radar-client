function createPostPermission(
  PostPermission,
  ngIfDirective
) {
  // Source: http://stackoverflow.com/a/24065378
  var ngIf = ngIfDirective[0];

  return {
    transclude: ngIf.transclude,
    priority: ngIf.priority,
    terminal: ngIf.terminal,
    restrict: ngIf.restrict,
    link: function(scope, element, attrs) {
      var permission = new PostPermission();

      attrs.ngIf = function() {
        return permission.hasPermission();
      };

      ngIf.link.apply(ngIf, arguments);
    }
  };
}

createPostPermission.$inject = [
  'PostPermission',
  'ngIfDirective'
];

export default createPostPermission;
