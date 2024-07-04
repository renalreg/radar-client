import angular from 'angular';

import fields from './fields';

import frmButtons from './buttons.directive';
import frmControl from './control.directive';
import frmDatePicker from './date-picker.directive';
import frmError from './error.directive';
import frmErrors from './errors.directive';
import frmField from './field.directive';
import frmGroupInline from './group-inline.directive';
import frmGroup from './group.directive';
import frmHelp from './help.directive';
import frmLabel from './label.directive';
import frmLayout from './layout.directive';
import frmModel from './model.directive';
import frmMultipleCheckbox from './multiple-checkbox.directive';
import frmRequired from './required.directive';
import frmStatus from './status.directive';
import submitButton from './submit-button.directive';
import submitIfValid from './submit-if-valid.directive';
import frmWeeksAndDays from './weeks-and-days.directive';
import frmHla from './hla.directive';
import frmMismatchHla from './mismatchhla.directive';

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
  .directive('submitButton', submitButton)
  .directive('submitIfValid', submitIfValid)
  .directive('frmWeeksAndDays', frmWeeksAndDays)
  .directive('frmHla', frmHla)
  .directive('frmMismatchHla', frmMismatchHla)
  .name;
