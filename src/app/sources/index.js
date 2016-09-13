import angular from 'angular';

import sourceModelMixinFactory from './source-model-mixin';

export default angular.module('radar.source', [])
  .factory('SourceModelMixin', sourceModelMixinFactory)
  .name;
