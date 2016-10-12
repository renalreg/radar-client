function patientSystemObjectPermissionFactory(
  PermissionChain, PatientObjectPermission, SystemObjectPermission
) {
  function PatientSystemObjectPermission(patient) {
    PermissionChain.call(this, [
      new PatientObjectPermission(patient),
      new SystemObjectPermission()
    ]);
  }

  PatientSystemObjectPermission.prototype = Object.create(PermissionChain.prototype);

  return PatientSystemObjectPermission;
}

patientSystemObjectPermissionFactory.$inject = [
  'PermissionChain', 'PatientObjectPermission', 'SystemObjectPermission'
];

export default patientSystemObjectPermissionFactory;
