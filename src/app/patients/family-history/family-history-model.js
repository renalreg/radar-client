function familyHistoryModelFactory(Model) {
  function FamilyHistoryModel(modelName, data) {
    if (data.relatives === undefined) {
      data.relatives = [];
    }

    Model.call(this, modelName, data);
  }

  FamilyHistoryModel.prototype = Object.create(Model.prototype);

  return FamilyHistoryModel;
}

familyHistoryModelFactory.$inject = ['Model'];

export default familyHistoryModelFactory;
