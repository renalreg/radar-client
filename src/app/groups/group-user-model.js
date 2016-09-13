import _ from 'lodash';

function groupUserModelFactory(Model) {
  function GroupUserModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  GroupUserModel.prototype = Object.create(Model.prototype);

  GroupUserModel.prototype.hasPermission = function(permission) {
    return _.indexOf(this.permissions, permission) >= 0;
  };

  return GroupUserModel;
}

groupUserModelFactory.$inject = ['Model'];

export default groupUserModelFactory;
