import dateTimeFormatFilter from '../src/app/filters/date-time-format.filter';
const dateTimeFormat = dateTimeFormatFilter();
describe('dateTimeFormat filter', () => {
  test.each([
    [null,      '-'],
    [undefined, '-'],
  ])('returns "-" for %s', (input, expected) => {
    expect(dateTimeFormat(input)).toBe(expected);
  });

  test.each([
    ['winter UTC', '2016-01-01T00:00:00+00:00', '01/01/2016 00:00:00 (UTC)'],
    ['summer UTC', '2016-07-01T00:00:00+00:00', '01/07/2016 00:00:00 (UTC)'],
  ])('displays %s correctly', (_label, input, expected) => {
    expect(dateTimeFormat(input)).toBe(expected);
  });
});

