function ageFormatFilter() {
  return function ageFormat(seconds) {
    var output;

    if (seconds !== null && seconds !== undefined) {
      var years = seconds / (365 * 24 * 60 * 60);
      var months = Math.floor((years - Math.floor(years)) * 12);
      years = Math.floor(years);

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
