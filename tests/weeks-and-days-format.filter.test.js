import weeksAndDaysFormat from '../src/app/filters/weeks-and-days-format.filter';

const format = weeksAndDaysFormat(); // 👈 IMPORTANT

describe('weeksAndDaysFormat filter', () => {
  test.each([
    [null, '-'],
    [undefined, '-'],
  ])('returns "-" for %s', (input, expected) => {
    expect(format(input)).toBe(expected);
  });

  test.each([
    [0, '0 days'],
    [1, '1 day'],
    [2, '2 days'],
    [7, '1 week'],
    [14, '2 weeks'],
    [123, '17 weeks, 4 days'],
  ])('formats %d days as "%s"', (days, expected) => {
    expect(format(days)).toBe(expected);
  });
});
