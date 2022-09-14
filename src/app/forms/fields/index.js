import angular from 'angular';

import frmBooleanField from './boolean-field.directive';
import frmBooleanUnknownField from './boolean-unknown-field.directive';
import frmCheckboxField from './checkbox-field.directive';
import frmCheckboxRequiredField from './checkbox-required-field.directive';
import frmCohortField from './cohort-field.directive';
import frmConfirmEmailField from './confirm-email-field.directive';
import frmConfirmPasswordField from './confirm-password-field.directive';
import frmConsentField from './consent-field.directive';
import frmDateField from './date-field.directive';
import frmDiagnosisField from './diagnosis-field.directive';
import frmDiagnosisStatusField from './diagnosis-status-field.directive';
import frmDrugField from './drug-field.directive';
import frmEmailField from './email-field.directive';
import frmGroupField from './group-field.directive';
import frmHospitalField from './hospital-field.directive';
import frmIntegerField from './integer-field.directive';
import frmMultipleCheckboxField from './multiple-checkbox-field.directive';
import frmNumberField from './number-field.directive';
import frmObservationField from './observation-field.directive';
import frmPasswordField from './password-field.directive';
import frmPrimaryDiagnosisField from './primary-diagnosis-field.directive';
import frmRadioField from './radio-field.directive';
import frmRecruitPatientCohortField from './recruit-patient-cohort-field.directive';
import frmRecruitPatientHospitalField from './recruit-patient-hospital-field.directive';
import frmSelectField from './select-field.directive';
import frmSourceGroupField from './source-group-field.directive';
import frmSystemField from './system-field.directive';
import frmTextEditorField from './text-editor-field.directive';
import frmTextField from './text-field.directive';
import frmTextareaField from './textarea-field.directive';
import frmWeeksAndDaysField from './weeks-and-days-field.directive';
import frmYesNoField from './yes-no-field.directive';

export default angular
  .module('radar.forms.fields', [])
  .directive('frmBooleanField', frmBooleanField)
  .directive('frmBooleanUnknownField', frmBooleanUnknownField)
  .directive('frmCheckboxField', frmCheckboxField)
  .directive('frmCheckboxRequiredField', frmCheckboxRequiredField)
  .directive('frmCohortField', frmCohortField)
  .directive('frmConfirmEmailField', frmConfirmEmailField)
  .directive('frmConfirmPasswordField', frmConfirmPasswordField)
  .directive('frmConsentField', frmConsentField)
  .directive('frmDateField', frmDateField)
  .directive('frmDiagnosisField', frmDiagnosisField)
  .directive('frmDiagnosisStatusField', frmDiagnosisStatusField)
  .directive('frmDrugField', frmDrugField)
  .directive('frmEmailField', frmEmailField)
  .directive('frmGroupField', frmGroupField)
  .directive('frmHospitalField', frmHospitalField)
  .directive('frmIntegerField', frmIntegerField)
  .directive('frmMultipleCheckboxField', frmMultipleCheckboxField)
  .directive('frmNumberField', frmNumberField)
  .directive('frmObservationField', frmObservationField)
  .directive('frmPasswordField', frmPasswordField)
  .directive('frmPrimaryDiagnosisField', frmPrimaryDiagnosisField)
  .directive('frmRadioField', frmRadioField)
  .directive('frmRecruitPatientCohortField', frmRecruitPatientCohortField)
  .directive('frmRecruitPatientHospitalField', frmRecruitPatientHospitalField)
  .directive('frmSelectField', frmSelectField)
  .directive('frmSourceGroupField', frmSourceGroupField)
  .directive('frmSystemField', frmSystemField)
  .directive('frmTextEditorField', frmTextEditorField)
  .directive('frmTextField', frmTextField)
  .directive('frmTextareaField', frmTextareaField)
  .directive('frmWeeksAndDaysField', frmWeeksAndDaysField)
  .directive('frmYesNoField', frmYesNoField).name;
