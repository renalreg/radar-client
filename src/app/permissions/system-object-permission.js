function systemObjectPermissionFactory(session) {
  function SystemObjectPermission() {
  }

  SystemObjectPermission.prototype.hasPermission = function() {
    return true;
  };

  SystemObjectPermission.prototype.hasObjectPermission = function(obj) {
    if (!session.isAuthenticated) {
      return false;
    }

    var sourceGroup = obj.sourceGroup;
    var sourceType = obj.sourceType;

    return sourceGroup.type === 'SYSTEM' && sourceType === 'RADAR';
  };

  return SystemObjectPermission;
}

systemObjectPermissionFactory.$inject = ['session'];

export default systemObjectPermissionFactory;
