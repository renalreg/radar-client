function createUserPermission(
  hasPermission,
  session,
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
      attrs.ngIf = function() {
        return hasPermission(session.user, 'EDIT_USER_MEMBERSHIP');
      };

      ngIf.link.apply(ngIf, arguments);
    }
  };
}

createUserPermission.$inject = [
  'hasPermission',
  'session',
  'ngIfDirective'
];

export default createUserPermission;
