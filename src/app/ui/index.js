import angular from 'angular';

import textEditor from './text-editor';
import fatalError from './fatal-error';

import filterHelper from './filter-helper.directive';
import {
  listHelper,
  listHelperProxyFactory
} from './list-helper.directive';
import liveWarning from './live-warning.directive';
import loading from './loading.directive';
import metadata from './metadata.directive';
import navbar from './navbar.directive';
import pageWrapper from './page-wrapper.directive';
import paginationHelper from './pagination-helper.directive';
import sortHelper from './sort-helper.directive';
import tick from './tick.directive';
import titleService from './title-service';

function run(titleService) {
  titleService.watch(function(title) {
    $window.document.title = title;
  });
}

run.$inject = ['titleService'];

export default angular.module('radar.ui', [textEditor, fatalError])
  .run(run)
  .directive('filterHelper', filterHelper)
  .directive('listHelper', listHelper)
  .factory('ListHelperProxy', listHelperProxyFactory)
  .directive('liveWarning', liveWarning)
  .directive('loading', loading)
  .directive('metadata', metadata)
  .directive('navbar', navbar)
  .directive('pageWrapper', pageWrapper)
  .directive('paginationHelper', paginationHelper)
  .directive('sortHelper', sortHelper)
  .directive('tick', tick)
  .factory('titleService', titleService)
  .name;
