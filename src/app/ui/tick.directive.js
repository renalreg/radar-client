import templateUrl from './tick.html';

function tick() {
  return {
    restrict: 'A',
    scope: {
      tick: '='
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.isTrue = function() {
        return scope.tick === true;
      };

      scope.isFalse = function() {
        return scope.tick === false;
      };

      scope.isNeither = function() {
        return !scope.isTrue() && !scope.isFalse();
      };
    }
  };
}

export default tick;
