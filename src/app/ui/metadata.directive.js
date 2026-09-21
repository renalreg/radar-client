import templateUrl from './metadata.html';

function metadata() {
  return {
    scope: {
      item: '='
    },
    template: templateUrl
  };
}

export default metadata;
