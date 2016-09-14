import templateUrl from './metadata.html';

function metadata() {
  return {
    scope: {
      item: '='
    },
    templateUrl: templateUrl
  };
}

export default metadata;
