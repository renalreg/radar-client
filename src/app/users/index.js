import angular from 'angular';

import groups from './groups';

import {
  createUserControllerFactory,
  createUserComponent
} from './create-user-component.directive';
import createUserPermission from './create-user-permission.directive';
import DeleteUserController from './delete-user.controller';
import {
  userPermissionFactory,
  userControllerFactory,
  userComponent
} from './user-component.directive';
import userListControllerFactory from './user-list.controller';

import userListTemplateUrl from './user-list.html';
import createUserTemplateUrl from './create-user.html';
import userDetailTemplateUrl from './user-detail.html';
import deleteUserTemplateUrl from './delete-user.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('users', 'UserModel');

  $stateProvider.state('users', {
    url: '/users',
    templateUrl: userListTemplateUrl,
    controller: ['$scope', '$controller', 'UserListController', function($scope, $controller, UserListController) {
      $controller(UserListController, {$scope: $scope});
    }]
  });

  $stateProvider.state('createUser', {
    url: '/users/create',
    templateUrl: createUserTemplateUrl
  });

  $stateProvider.state('user', {
    url: '/users/:userId',
    templateUrl: userDetailTemplateUrl,
    controller: ['$scope', 'user', 'session', function($scope, user, session) {
      $scope.user = user;
      $scope.currentUser = session.user;
    }],
    resolve: {
      user: ['$stateParams', 'store', function($stateParams, store) {
        return store.findOne('users', $stateParams.userId);
      }]
    }
  });

  $stateProvider.state('deleteUser', {
    url: '/users/:userId/delete',
    templateUrl: deleteUserTemplateUrl,
    controller: 'DeleteUserController',
    resolve: {
      user: ['$stateParams', 'store', function($stateParams, store) {
        return store.findOne('users', $stateParams.userId);
      }]
    }
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.users', [groups])
  .config(config)
  .factory('CreateUserController', createUserControllerFactory)
  .directive('createUserComponent', createUserComponent)
  .directive('createUserPermission', createUserPermission)
  .controller('DeleteUserController', DeleteUserController)
  .factory('UserPermission', userPermissionFactory)
  .factory('UserController', userControllerFactory)
  .directive('userComponent', userComponent)
  .factory('UserListController', userListControllerFactory)
  .name;
