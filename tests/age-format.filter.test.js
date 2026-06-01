import ageFormatFilter from '../src/app/filters/age-format.filter';
const ageFormat = ageFormatFilter();
describe('ageFormat filter', () => {
  test.each([
    [null,      '-'],
    [undefined, '-'],
  ])('returns "-" for %s', (input, expected) => {
    expect(ageFormat(input)).toBe(expected);
  });

  test.each([
    [0,   '0 years'],
    [1,   '0 years, 1 month'],
    [6,   '0 years, 6 months'],
    [12,  '1 year'],
    [18,  '1 year, 6 months'],
    [120, '10 years'],
  ])('formats %d months as "%s"', (months, expected) => {
    expect(ageFormat(months)).toBe(expected);
  });
});
