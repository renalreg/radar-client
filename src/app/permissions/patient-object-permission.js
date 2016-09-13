function patientObjectPermissionFactory(session, hasPermissionForPatient) {
  function PatientObjectPermission(patient) {
    this.patient = patient;
  }

  PatientObjectPermission.prototype.hasPermission = function() {
    if (!session.isAuthenticated) {
      return false;
    }

    var user = session.user;

    return hasPermissionForPatient(user, this.patient, 'EDIT_PATIENT');
  };

  PatientObjectPermission.prototype.hasObjectPermission = function() {
    return this.hasPermission();
  };

  return PatientObjectPermission;
}

patientObjectPermissionFactory.$inject = ['session', 'hasPermissionForPatient'];

export default patientObjectPermissionFactory;
