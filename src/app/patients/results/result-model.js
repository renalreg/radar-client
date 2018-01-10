function resultModelFactory(Model, lazyLoad) {
  function ResultModel(modelName, data) {
    data.observation = lazyLoad('observations', data.observation);
    data.sourceGroup = lazyLoad('groups', data.sourceGroup);
    data.createdUser = lazyLoad('users', data.createdUser);
    data.modifiedUser = lazyLoad('users', data.modifiedUser);
    Model.call(this, modelName, data);
  }

  ResultModel.prototype = Object.create(Model.prototype);

  ResultModel.prototype.getDisplayValue = function() {
    return this.sentValue.description || this.sentValue;
  };

  return ResultModel;
}

resultModelFactory.$inject = ['Model', 'lazyLoad'];

export default resultModelFactory;
