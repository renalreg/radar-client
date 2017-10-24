import angular from 'angular';
import localStorage from 'angular-local-storage';
import uiRouter from 'angular-ui-router';

import account from './account';
import auth from './auth';
import cohorts from './cohorts';
import consultants from './consultants';
import controllers from './controllers';
import core from './core';
import crud from './crud';
import diagnoses from './diagnoses';
import filters from './filters';
import forms from './forms';
import groups from './groups';
import home from './home';
import hospitals from './hospitals';
import logs from './logs';
import marmoset from './marmoset';
import notifications from './notifications';
import observations from './observations';
import patients from './patients';
import permissions from './permissions';
import posts from './posts';
import recruitPatient from './recruit-patient';
import sessions from './sessions';
import sources from './sources';
import store from './store';
import systems from './systems';
import ui from './ui';
import users from './users';
import utils from './utils';
import validators from './validators';

import getValueAtPath from './utils/get-value-at-path';

function config($urlRouterProvider, adapterProvider) {
  adapterProvider.setBaseUrl('/api');
  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$urlRouterProvider', 'adapterProvider'];

function run(
  $rootScope,
  radar,
  session,
  $state,
  notificationService,
  sessionTimeoutService
) {
  var CHANGE_PASSWORD_STATE = 'changePassword';

  $rootScope.$watch(function() {
    return radar.ready;
  }, function(ready) {
    $rootScope.ready = ready;
  });

  sessionTimeoutService.init();

  function isPublicState(state) {
    return getValueAtPath(state, 'data.public');
  }

  // Users that haven't logged in can only view public pages
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (!isPublicState(toState)) {
      radar.readyPromise.then(function() {
        if (!session.isAuthenticated) {
          event.preventDefault();
          $state.go('login');
        }
      });
    }
  });

  // Force the user to change their password
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (!isPublicState(toState) && toState.name !== CHANGE_PASSWORD_STATE) {
      var user = session.user;

      if (user !== null && user.forcePasswordChange) {
        event.preventDefault();
        notificationService.info({
          title: 'Attention',
          message: 'Please update your password.'
        });
        $state.go(CHANGE_PASSWORD_STATE);
      }
    }
  });
}

run.$inject = [
  '$rootScope',
  'radar',
  'session',
  '$state',
  'notificationService',
  'sessionTimeoutService'
];

export default angular.module('radar', [
  localStorage,
  uiRouter,
  account,
  auth,
  cohorts,
  consultants,
  controllers,
  core,
  crud,
  diagnoses,
  filters,
  forms,
  groups,
  home,
  hospitals,
  logs,
  marmoset,
  notifications,
  observations,
  patients,
  permissions,
  posts,
  recruitPatient,
  sessions,
  sources,
  store,
  systems,
  ui,
  users,
  utils,
  validators
])
  .config(config)
  .run(run)
  .name;
