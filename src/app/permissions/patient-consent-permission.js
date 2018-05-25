function patientConsentPermissionFactory(session, hasPermissionForPatient) {
  function PatientConsentPermission(patient) {
    this.patient = patient;
  }

  PatientConsentPermission.prototype.hasPermission = function() {
    if (!session.isAuthenticated) {
      return false;
    }

    var user = session.user;

    return hasPermissionForPatient(user, this.patient, 'EDIT_CONSENT');
  };

  PatientConsentPermission.prototype.hasObjectPermission = function() {
    return this.hasPermission();
  };

  return PatientConsentPermission;
}

patientConsentPermissionFactory.$inject = ['session', 'hasPermissionForPatient'];

export default patientConsentPermissionFactory;
