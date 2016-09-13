function missingFilter() {
  return function missing(input) {
    if (input === '' || input === null || input === undefined) {
      return '-';
    } else {
      return input;
    }
  };
}

export default missingFilter;
