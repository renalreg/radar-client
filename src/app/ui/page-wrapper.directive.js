import templateUrl from './page-wrapper.html';

function pageWrapper() {
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: templateUrl
  };
}

export default pageWrapper;
