import angular from 'angular';

import textEditor from './text-editor.directive';

export default angular.module('radar.ui.textEditor', [])
  .directive('textEditor', textEditor)
  .name;
