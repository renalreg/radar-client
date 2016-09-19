function grantPermissionFactory() {
  function GrantPermission() {
  }

  GrantPermission.prototype.hasPermission = function() {
    return true;
  };

  GrantPermission.prototype.hasObjectPermission = function() {
    return true;
  };

  return GrantPermission;
}

export default grantPermissionFactory;
