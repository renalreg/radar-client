import angular from 'angular';
import localStorage from 'angular-local-storage';
import uiRouter from 'angular-ui-router';
import Highcharts from 'highcharts';

import account from './account';
import auth from './auth';
import cohorts from './cohorts';
import consultants from './consultants';
import controllers from './controllers';

Highcharts.setOptions({
  global: {
    // Don't convert datetimes to UTC (causes BST issues)
    useUTC: false
  }
});

function config($urlRouterProvider, adapterProvider) {
  adapterProvider.setBaseUrl('/api');
  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$urlRouterProvider', 'adapterProvider'];

function run(
  $rootScope,
  radar,
  getValueAtPath,
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
  'getValueAtPath',
  'session',
  '$state',
  'notificationService',
  'sessionTimeoutService'
];

angular.module('radar', [
  localStorage,
  uiRouter,
  account,
  auth,
  cohorts,
  consultants,
  controllers,
  'radar.core',
  'radar.crud',
  'radar.diagnoses',
  'radar.filters',
  'radar.forms',
  'radar.groups',
  'radar.home',
  'radar.hospitals',
  'radar.logs',
  'radar.notifications',
  'radar.observations',
  'radar.patients',
  'radar.permissions',
  'radar.posts',
  'radar.recruitPatient',
  'radar.sessions',
  'radar.sources',
  'radar.store',
  'radar.ui',
  'radar.users',
  'radar.utils',
  'radar.validators'
])
  .config(config)
  .run(run);
