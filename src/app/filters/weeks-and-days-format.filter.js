function weeksAndDaysFormatFilter() {
  return function weeksAndDaysFormat(value) {
    var output;

    if (value !== null && value !== undefined) {
      var weeks = Math.floor(value / 7);
      var days = value % 7;

      output = '';

      if (weeks > 0) {
        output += weeks + ' ' + (weeks === 1 ? 'week' : 'weeks');

        if (days > 0) {
          output += ', ';
        }
      }

      if (weeks === 0 || days > 0) {
        output += days + ' ' + (days === 1 ? 'day' : 'days');
      }
    } else {
      output = '-';
    }

    return output;
  };
}

export default weeksAndDaysFormatFilter;
