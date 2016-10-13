import moment from 'moment';

function dateTimeFormatFilter() {
  return function dateTimeFormat(input) {
    if (input) {
      var dt = moment(input);

      if (dt.isValid()) {
        return dt.utc().format('DD/MM/YYYY HH:mm:ss') + ' (UTC)';
      } else {
        return '-';
      }
    } else {
      return '-';
    }
  };
}

export default dateTimeFormatFilter;
