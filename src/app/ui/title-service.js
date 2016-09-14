import _ from 'lodash';

function titleService($rootScope) {
  var defaultTitle = 'RaDaR';
  var title = defaultTitle;
  var callbacks = [];

  // Listen for navigation
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    var newTitle = (toState.data !== undefined && toState.data.title !== undefined) ? toState.data.title : null;

    // Setting data.title to false prevents the title being updated on state change
    if (newTitle !== false) {
      setTitle(newTitle);
    }
  });

  return {
    setTitle: setTitle,
    getTitle: getTitle,
    watch: watch
  };

  function setTitle(newTitle) {
    if (newTitle === undefined || newTitle === null) {
      newTitle = defaultTitle;
    }

    if (title !== newTitle) {
      title = newTitle;
      broadcast(title);
    }
  }

  function getTitle() {
    return title;
  }

  function watch(callback) {
    callbacks.push(callback);
    callback(getTitle());
  }

  function broadcast() {
    _.forEach(callbacks, function(callback) {
      callback(getTitle());
    });
  }
}

titleService.$inject = ['$rootScope'];

export default titleService;
