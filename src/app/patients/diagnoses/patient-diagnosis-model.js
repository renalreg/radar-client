function patientDiagnosisModelFactory(Model) {
  function PatientDiagnosisModel(modelName, data) {
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

patientDiagnosisModelFactory.$inject = ['Model'];

export default patientDiagnosisModelFactory;
