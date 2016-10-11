/** Controller for a single patient. */
function PatientDetailController(
  $scope,
  patient,
  session,
  hasPermissionForPatient,
  titleService
) {
  $scope.patient = patient;
  $scope.viewDemographicsPermission = hasPermissionForPatient(session.user, patient, 'VIEW_DEMOGRAPHICS');

  // Set the title to the patient's ID
  $scope.$watch(function() {
    // No demographics
    return patient.getName(false);
  }, titleService.setTitle);
}

PatientDetailController.$inject = [
  '$scope',
  'patient',
  'session',
  'hasPermissionForPatient',
  'titleService'
];

export default PatientDetailController;
