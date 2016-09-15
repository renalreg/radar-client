import angular from 'angular';

import fields from './fields';

import frmButtons from './buttons.directive';
import frmControl from './control.directive';
import frmDatePicker from './date-picker.directive';
import frmError from './error.directive';
import frmErrors from './errors.directive';
import frmField from './field.directive';
import frmGroupInline from './group-inline.directive'
import frmGroup from './group.directive';
import frmHelp from './help.directive';
import frmLabel from './label.directive';
import frmLayout from './layout.directive';
import frmModel from './model.directive';
import frmMultipleCheckbox from './multiple-checkbox.directive';
import frmRequired from './required.directive';
import frmStatus from './status.directive';
import frmSubmitButton from './submit-button.directive';
import frmSubmitIfValid from './submit-if-valid.directive';
import frmWeeksAndDays from './weeks-and-days.directive';

export default angular.module('radar.forms', [fields])
  .directive('frmButtons', frmButtons)
  .directive('frmControl', frmControl)
  .directive('frmDatePicker', frmDatePicker)
  .directive('frmError', frmError)
  .directive('frmErrors', frmErrors)
  .directive('frmField', frmField)
  .directive('frmGroupInline', frmGroupInline)
  .directive('frmGroup', frmGroup)
  .directive('frmHelp', frmHelp)
  .directive('frmLabel', frmLabel)
  .directive('frmLayout', frmLayout)
  .directive('frmModel', frmModel)
  .directive('frmMultipleCheckbox', frmMultipleCheckbox)
  .directive('frmRequired', frmRequired)
  .directive('frmStatus', frmStatus)
  .directive('frmSubmitButton', frmSubmitButton)
  .directive('frmSubmitIfValid', frmSubmitIfValid)
  .directive('frmWeeksAndDays', frmWeeksAndDays)
  .name;
