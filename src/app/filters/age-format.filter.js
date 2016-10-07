function ageFormatFilter() {
  return function ageFormat(months) {
    var output;

    if (months != null) {
      var years = Math.floor(months / 12);
      months = months % 12;

      output = years + ' ' + (years === 1 ? 'year' : 'years');

      if (months > 0) {
        output +=  ', ' + months + ' ' + (months === 1 ? 'month' : 'months');
      }
    } else {
      output = '-';
    }

    return output;
  };
}

export default ageFormatFilter;
