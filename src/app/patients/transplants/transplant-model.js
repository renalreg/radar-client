function transplantModelFactory(Model) {
  function TransplantModel(modelName, data) {
    if (data.biopsies === undefined) {
      data.biopsies = [];
    }

    if (data.rejections === undefined) {
      data.rejections = [];
    }

    Model.call(this, modelName, data);
  }

  TransplantModel.prototype = Object.create(Model.prototype);

  return TransplantModel;
}

transplantModelFactory.$inject = ['Model'];

export default transplantModelFactory;
