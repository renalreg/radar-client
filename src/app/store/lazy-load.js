import _ from 'lodash';

function lazyLoadFactory(store) {
  return function lazyLoad(modelName, data) {
    var item;
    var id;

    if (_.isObject(data)) {
      id = data.id;

      item = store.getFromStore(modelName, id);

      if (item === null) {
        item = store.pushToStore(store.create(modelName, data));
      }
    } else if (data) {
      id = data;

      item = store.getFromStore(modelName, id);

      if (item === null) {
        item = store.create(modelName, {id: id});
        item = store.pushToStore(item);
        item.reload();
      }
    } else {
      item = data;
    }

    return item;
  };
}

lazyLoadFactory.$inject = ['store'];

export default lazyLoadFactory;
