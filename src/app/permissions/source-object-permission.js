function sourceObjectPermissionFactory(session, hasPermissionForGroup) {
  function SourceObjectPermission() {
  }

  SourceObjectPermission.prototype.hasPermission = function() {
    return true;
  };

  SourceObjectPermission.prototype.hasObjectPermission = function(obj) {
    if (!session.isAuthenticated) {
      return false;
    }

    var sourceType = obj.sourceType;

    if (sourceType !== 'RADAR') {
      return false;
    }

    var user = session.user;

    if (user.isAdmin) {
      return true;
    }

    var sourceGroup = obj.sourceGroup;

    return hasPermissionForGroup(user, sourceGroup, 'EDIT_PATIENT');
  };

  return SourceObjectPermission;
}

sourceObjectPermissionFactory.$inject = ['session', 'hasPermissionForGroup'];

export default sourceObjectPermissionFactory;
