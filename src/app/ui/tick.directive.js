import templateUrl from './tick.html';

function tick() {
  return {
    restrict: 'A',
    scope: {
      tick: '='
    },
    templateUrl: templateUrl,
    link: function (scope) {
      scope.isTrue = function () {
        return scope.tick === true;
      };

      scope.isFalse = function () {
        return scope.tick === false;
      };

      scope.signedOffIsZero = function () {
        return scope.tick === 0;
      };

      scope.signedOffIsOne = function () {
        return scope.tick === 1;
      };

      scope.signedOffIsTwo = function () {
        return scope.tick === 2;
      };

      scope.signedOffIsThree = function () {
        return scope.tick === 3;
      };

      scope.signedOffIsFour = function () {
        return scope.tick === 4;
      };

      scope.signedOffIsNull = function () {
        return scope.tick == null;
      };

      scope.isNeither = function () {
        return !scope.isTrue()
          && !scope.isFalse()
          && !scope.signedOffIsZero()
          && !scope.signedOffIsOne()
          && !scope.signedOffIsTwo()
          && !scope.signedOffIsThree()
          && !scope.signedOffIsFour()
          && !scope.signedOffIsNull();
      };
    }
  };
}

export default tick;
