function denyPermissionFactory() {
  function DenyPermission() {
  }

  DenyPermission.prototype.hasPermission = function() {
    return false;
  };

  DenyPermission.prototype.hasObjectPermission = function() {
    return false;
  };

  return DenyPermission;
}

export default denyPermissionFactory;
