import angular from 'angular';

import crudCancelButton from './cancel-button.directive';
import crudCancelListButton from './cancel-list-button.directive';
import crudCreateButton from './create-button.directive';
import crud from './crud.directive';
import crudEditButton from './edit-button.directive';
import crudListAppendButton from './list-append-button.directive';
import crudListButton from './list-button.directive';
import crudListEditButton from './list-edit-button.directive';
import crudListRemoveButton from './list-remove-button.directive';
import crudListViewButton from './list-view-button.directive';
import crudRemoveButton from './remove-button.directive';
import crudSaveButton from './save-button.directive';
import crudSubmit from './submit.directive';
import crudViewButton from './view-button.directive';

export default angular.module('radar.crud', [])
  .directive('crudCancelButton', crudCancelButton)
  .directive('crudCancelListButton', crudCancelListButton)
  .directive('crudCreateButton', crudCreateButton)
  .directive('crud', crud)
  .directive('crudEditButton', crudEditButton)
  .directive('crudListAppendButton', crudListAppendButton)
  .directive('crudListButton', crudListButton)
  .directive('crudListEditButton', crudListEditButton)
  .directive('crudListRemoveButton', crudListRemoveButton)
  .directive('crudListViewButton', crudListViewButton)
  .directive('crudRemoveButton', crudRemoveButton)
  .directive('crudSaveButton', crudSaveButton)
  .directive('crudSubmit', crudSubmit)
  .directive('crudViewButton', crudViewButton)
  .name;
