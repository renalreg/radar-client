import templateUrl from './live-warning.html';

function liveWarning(adapter) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: templateUrl,
    link: function(scope) {
      scope.live = true;

      adapter.get('/environment').then(function(response) {
        scope.live = response.data.live;
      });
    }
  };
}

liveWarning.$inject = ['adapter'];

export default liveWarning;
