function patientConsultantModelFactory(Model, store) {
  function PatientConsultantModel(modelName, data) {
    if (data.consultant) {
      // Create a consultant model
      data.consultant = store.create('consultants', data.consultant);
    }

    Model.call(this, modelName, data);
  }

  PatientConsultantModel.prototype = Object.create(Model.prototype);

  return PatientConsultantModel;
}

patientConsultantModelFactory.$inject = ['Model', 'store'];

export default patientConsultantModelFactory;
