import _ from 'lodash';

import templateUrl from './latest-posts.html';

function latestPostsControllerFactory(ListController, $injector, store, $sce) {
  function LatestPostsController($scope) {
    var self = this;

    $injector.invoke(ListController, self, {$scope: $scope});

    self.load(store.findMany('posts', {sort: '-publishedDate', perPage: 1, page: 1}));
  }

  LatestPostsController.$inject = ['$scope'];

  LatestPostsController.prototype = Object.create(ListController.prototype);

  return LatestPostsController;
}

latestPostsControllerFactory.$inject = ['ListController', '$injector', 'store', '$sce'];

function latestPosts(LatestPostsController) {
  return {
    scope: {},
    controller: LatestPostsController,
    templateUrl: templateUrl
  };
}

latestPosts.$inject = ['LatestPostsController'];

export {
  latestPostsControllerFactory,
  latestPosts
};
