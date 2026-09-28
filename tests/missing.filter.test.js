import missingFactory from '../src/app/filters/missing.filter';

// instantiate factory (no Angular needed)
const missing = missingFactory();

describe('missing filter', () => {
  test.each([
    [null, '-'],
    [undefined, '-'],
    ['', '-'],
  ])('returns "-" for %s', (input, expected) => {
    expect(missing(input)).toBe(expected);
  });

  test('passes zero through unchanged', () => {
    expect(missing(0)).toBe(0);
  });
});
