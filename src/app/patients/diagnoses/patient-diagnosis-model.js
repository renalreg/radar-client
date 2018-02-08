function patientDiagnosisModelFactory(Model, store) {
  function PatientDiagnosisModel(modelName, data) {
    if (data.diagnosis) {
      // Create a diagnosis model
      data.diagnosis = store.pushToStore(store.create('diagnoses', data.diagnosis));
    }

    Model.call(this, modelName, data);
  }

  PatientDiagnosisModel.prototype = Object.create(Model.prototype);

  /**
   * Returns the diagnosis name (coded diagnosis takes precedence).
   *
   * @returns {string} - the diagnosis name.
   */
  PatientDiagnosisModel.prototype.getDiagnosis = function() {
    var name;

    // Check for a coded diagnosis
    if (this.diagnosisText) {
      name = this.diagnosisText;
    } else {
      name = this.diagnosis.name;
    }

    return name;
  };

  return PatientDiagnosisModel;
}

patientDiagnosisModelFactory.$inject = ['Model', 'store'];

export default patientDiagnosisModelFactory;
