function transplantModelFactory(Model) {
  function TransplantModel(modelName, data) {
    if (data.biopsies === undefined) {
      // Default biopsies to an empty list
      data.biopsies = [];
    }

    if (data.rejections === undefined) {
      // Default rejections to an empty list
      data.rejections = [];
    }

    Model.call(this, modelName, data);
  }

  TransplantModel.prototype = Object.create(Model.prototype);

  return TransplantModel;
}

transplantModelFactory.$inject = ['Model'];

export default transplantModelFactory;
