import templateUrl from './page-wrapper.html';

function pageWrapper() {
  return {
    restrict: 'A',
    transclude: true,
    template: templateUrl
  };
}

export default pageWrapper;
