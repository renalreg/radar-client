import angular from 'angular';

import {
  marmosetColumns,
  marmosetList,
  marmosetForm,
  marmosetField,
  createSchema
} from './core';
import {
  marmosetView,
  marmosetBasicView
} from './views';
import {
  marmosetWidget,
  marmosetIntWidget,
  marmosetStringWidget,
  marmosetDateWidget,
  marmosetFloatWidget,
  marmosetSelectWidget,
  marmosetRadioWidget,
  marmosetYesNoRadioWidget,
  checkboxes,
  marmosetCheckboxesWidget,
  marmosetStaticWidget
} from './widgets';

export default angular.module('radar.marmoset', [])
  .directive('marmosetColumns', marmosetColumns)
  .directive('marmosetList', marmosetList)
  .directive('marmosetForm', marmosetForm)
  .directive('marmosetField', marmosetField)
  .factory('createSchema', createSchema)
  .directive('marmosetView', marmosetView)
  .directive('marmosetBasicView', marmosetBasicView)
  .directive('marmosetWidget', marmosetWidget)
  .directive('marmosetIntWidget', marmosetIntWidget)
  .directive('marmosetStringWidget', marmosetStringWidget)
  .directive('marmosetDateWidget', marmosetDateWidget)
  .directive('marmosetFloatWidget', marmosetFloatWidget)
  .directive('marmosetSelectWidget', marmosetSelectWidget)
  .directive('marmosetRadioWidget', marmosetRadioWidget)
  .directive('marmosetYesNoRadioWidget', marmosetYesNoRadioWidget)
  .directive('checkboxes', checkboxes)
  .directive('marmosetCheckboxesWidget', marmosetCheckboxesWidget)
  .directive('marmosetStaticWidget', marmosetStaticWidget)
  .name;
