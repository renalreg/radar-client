import angular from 'angular';

import ForgotPasswordController from './forgot-password.controller';
import ForgotUsernameController from './forgot-username.controller';
import ResetPasswordController from './reset-password.controller';
import authStore from './auth-store';
import authService from './auth-service';
import loginRedirect from './login-redirect';
import loginFormDirective from './login-form.directive';
import logoutDirective from './logout.directive';
import randomPassword from './random-password';
import randomPasswordDirective from './random-password.directive';

import loginTemplateUrl from './login.html';
import forgotUsernameTemplateUrl from './forgot-username.html';
import forgotPasswordTemplateUrl from './forgot-password.html';
import resetPasswordTemplateUrl from './reset-password.html';

function config($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: loginTemplateUrl,
    data: {
      public: true
    }
  });

  $stateProvider.state('forgotUsername', {
    url: '/forgot-username',
    controller: 'ForgotUsernameController',
    templateUrl: forgotUsernameTemplateUrl,
    data: {
      public: true
    }
  });

  $stateProvider.state('forgotPassword', {
    url: '/forgot-password',
    controller: 'ForgotPasswordController',
    templateUrl: forgotPasswordTemplateUrl,
    data: {
      public: true
    }
  });

  $stateProvider.state('resetPassword', {
    url: '/reset-password/:token',
    controller: 'ResetPasswordController',
    templateUrl: resetPasswordTemplateUrl,
    data: {
      public: true
    }
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.auth', [])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)
  .controller('ForgotUsernameController', ForgotUsernameController)
  .controller('ResetPasswordController', ResetPasswordController)
  .directive('loginForm', loginFormDirective)
  .directive('logout', logoutDirective)
  .directive('randomPassword', randomPasswordDirective)
  .factory('authStore', authStore)
  .factory('authService', authService)
  .factory('loginRedirect', loginRedirect)
  .factory('randomPassword', randomPassword)
  .name;