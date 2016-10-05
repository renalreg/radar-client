function patientDiagnosisModelFactory(Model, store) {
  function PatientDiagnosisModel(modelName, data) {
    if (data.diagnosis) {
      data.diagnosis = store.pushToStore(store.create('diagnoses', data.diagnosis))
    }

    Model.call(this, modelName, data);
  }

  PatientDiagnosisModel.prototype = Object.create(Model.prototype);

  PatientDiagnosisModel.prototype.getDiagnosis = function() {
    var r;

    if (this.diagnosis) {
      r = this.diagnosis.name;
    } else {
      r = this.diagnosisText;
    }

    return r;
  };

  return PatientDiagnosisModel;
}

patientDiagnosisModelFactory.$inject = ['Model', 'store'];

export default patientDiagnosisModelFactory;
