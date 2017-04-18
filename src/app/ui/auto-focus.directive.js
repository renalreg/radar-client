function autoFocus($timeout) {
  return {
    restrict: 'A',
    link: function(_scope, _element) {
      $timeout(function() {
        _element.find('input')[0].focus();
      }, 0);
    }
  };
}

autoFocus.$inject = ['$timeout'];

export default autoFocus;
