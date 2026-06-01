import compare from '../src/app/utils/compare';

describe('compare', () => {
  const sort = (x) => [...x].sort(compare);

  test('sorts an empty array', () => {
    expect(sort([])).toEqual([]);
  });

  test.each([
    ['numbers', [3, 2, 1], [1, 2, 3]],
    ['strings', ['c', 'a', 'b'], ['a', 'b', 'c']],
    [
      'arrays (lexicographic)',
      [[101, 'b'], [11, 'c'], [101, 'a']],
      [[11, 'c'], [101, 'a'], [101, 'b']],
    ],
    ['arrays of uneven length', [[1, 2, 3], [1, 2]], [[1, 2], [1, 2, 3]]],
  ])('sorts %s', (_desc, input, expected) => {
    expect(sort(input)).toEqual(expected);
  });
});
