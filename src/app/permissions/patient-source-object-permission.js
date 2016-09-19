function patientSourceObjectPermissionFactory(
  PermissionChain, PatientObjectPermission, SourceObjectPermission
) {
  function PatientSourceObjectPermission(patient) {
    PermissionChain.call(this, [
      new PatientObjectPermission(patient),
      new SourceObjectPermission(patient)
    ]);
  }

  PatientSourceObjectPermission.prototype = Object.create(PermissionChain.prototype);

  return PatientSourceObjectPermission;
}

patientSourceObjectPermissionFactory.$inject = [
  'PermissionChain', 'PatientObjectPermission', 'SourceObjectPermission'
];

export default patientSourceObjectPermissionFactory;
