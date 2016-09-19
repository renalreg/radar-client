function patientRadarObjectPermissionFactory(
  PermissionChain, PatientObjectPermission, RadarObjectPermission
) {
  function PatientRadarObjectPermission(patient) {
    PermissionChain.call(this, [
      new PatientObjectPermission(patient),
      new RadarObjectPermission()
    ]);
  }

  PatientRadarObjectPermission.prototype = Object.create(PermissionChain.prototype);

  return PatientRadarObjectPermission;
}

patientRadarObjectPermissionFactory.$inject = [
  'PermissionChain', 'PatientObjectPermission', 'RadarObjectPermission'
];

export default patientRadarObjectPermissionFactory;
