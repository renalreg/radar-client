function rituximabCriteriaModelFactory(Model) {
  function RituximabCriteriaModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  RituximabCriteriaModel.prototype = Object.create(Model.prototype);

  return RituximabCriteriaModel;
}

rituximabCriteriaModelFactory.$inject = ['Model'];

export default rituximabCriteriaModelFactory;
