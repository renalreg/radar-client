import angular from 'angular';

import createPostPermission from './create-post-permission.directive';
import {
  latestPostsControllerFactory,
  latestPosts
} from './latest-posts.directive';
import {
  postPermissionFactory,
  postDetailControllerFactory
} from './post-detail.controller';
import postListControllerFactory from './post-list.controller';

import postListTemplateUrl from './post-list.html';
import postDetailTemplateUrl from './post-detail.html';

function config($stateProvider) {
  $stateProvider.state('posts', {
    url: '/news',
    templateUrl: postListTemplateUrl,
    controller: ['$scope', '$controller', 'PostListController', function($scope, $controller, PostListController) {
      $controller(PostListController, {$scope: $scope});
    }],
    data: {
      public: true
    }
  });

  $stateProvider.state('createPost', {
    url: '/news/create',
    templateUrl: postDetailTemplateUrl,
    controller: ['$scope', '$controller', 'PostDetailController', 'post', function($scope, $controller, PostDetailController, post) {
      $scope.post = post;
      $controller(PostDetailController, {$scope: $scope});
    }],
    resolve: {
      post: ['store', function(store) {
        return store.create('posts');
      }]
    }
  });

  $stateProvider.state('post', {
    url: '/news/:postId',
    templateUrl: postDetailTemplateUrl,
    controller: ['$scope', '$controller', 'PostDetailController', 'post', function($scope, $controller, PostDetailController, post) {
      $scope.post = post;
      $controller(PostDetailController, {$scope: $scope});
    }],
    resolve: {
      post: ['store', '$stateParams', function(store, $stateParams) {
        return store.findOne('posts', $stateParams.postId);
      }]
    },
    data: {
      public: true
    }
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.posts', [])
  .config(config)
  .directive('createPostPermission', createPostPermission)
  .factory('LatestPostsController', latestPostsControllerFactory)
  .directive('latestPosts', latestPosts)
  .factory('PostPermission', postPermissionFactory)
  .factory('PostDetailController', postDetailControllerFactory)
  .factory('PostListController', postListControllerFactory)
  .name;
