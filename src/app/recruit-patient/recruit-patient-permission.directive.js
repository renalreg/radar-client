function recruitPatientPermission(
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
        return hasPermission(session.user, 'RECRUIT_PATIENT');
      };

      ngIf.link.apply(ngIf, arguments);
    }
  };
}

recruitPatientPermission.$inject = [
  'hasPermission',
  'session',
  'ngIfDirective'
];

export default recruitPatientPermission;
