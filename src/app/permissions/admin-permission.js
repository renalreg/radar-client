function adminPermissionFactory(session) {
  function AdminPermission() {
  }

  AdminPermission.prototype.hasPermission = function() {
    return session.isAuthenticated && session.user.isAdmin;
  };

  AdminPermission.prototype.hasObjectPermission = function() {
    return session.isAuthenticated && session.user.isAdmin;
  };

  return AdminPermission;
}

adminPermissionFactory.$inject = ['session'];

export default adminPermissionFactory;
