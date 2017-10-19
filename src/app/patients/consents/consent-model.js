function patientConsentModelFactory(Model, store) {
  function PatientConsentModel(modelName, data) {
    Model.call(this, modelName, data);

  }

  PatientConsentModel.prototype = Object.create(Model.prototype);

  PatientConsentModel.prototype.getReconsentDate = function(patient) {
    var myDate = new Date(patient.dateOfBirth);
    myDate.setFullYear(myDate.getFullYear() + 16);
    return myDate.toISOString();
  }

  return PatientConsentModel;
}

patientConsentModelFactory.$inject = ['Model', 'store'];

export default patientConsentModelFactory;
