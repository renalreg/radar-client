import dateFormatFilter from '../src/app/filters/date-format.filter';

const dateFormat = dateFormatFilter();

describe('dateFormat filter', () => {
  test.each([
    [null,      '-'],
    [undefined, '-'],
  ])('returns "-" for %s', (input, expected) => {
    expect(dateFormat(input)).toBe(expected);
  });

  test('formats an ISO date as DD/MM/YYYY', () => {
    expect(dateFormat('2003-02-01')).toBe('01/02/2003');
  });
});
