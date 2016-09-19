import angular from 'angular';

import listControllerFactory from './list-controller';
import listEditControllerFactory from './list-edit-controller';
import modelDetailControllerFactory from './model-detail-controller';
import modelEditControllerFactory from './model-edit-controller';
import modelListDetailControllerFactory from './model-list-detail-controller';

export default angular.module('radar.controllers', [])
  .factory('ListController', listControllerFactory)
  .factory('ListEditController', listEditControllerFactory)
  .factory('ModelDetailController', modelDetailControllerFactory)
  .factory('ModelEditController', modelEditControllerFactory)
  .factory('ModelListDetailController', modelListDetailControllerFactory)
  .name;
