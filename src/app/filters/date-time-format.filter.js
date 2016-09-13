import moment from 'moment';

function dateTimeFormatFilter() {
  return function dateTimeFormat(input) {
    if (input) {
      var dt = moment(input);

      if (dt.isValid()) {
        return dt.format('DD/MM/YYYY HH:mm:ss');
      } else {
        return '-';
      }
    } else {
      return '-';
    }
  };
}

export default dateTimeFormatFilter;
