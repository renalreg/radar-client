function dateFormatFilter() {
  return function dateFormat(oldValue) {
    var newValue;

    if (oldValue) {
      var year = oldValue.substr(0, 4);
      var month = oldValue.substr(5, 2);
      var day = oldValue.substr(8, 2);

      newValue = day + '/' + month + '/' + year;
    } else {
      newValue = '-';
    }

    return newValue;
  };
}

export default dateFormatFilter;
