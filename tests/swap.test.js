import swap from '../src/app/utils/swap';

describe('swap', () => {
  test('swaps two distinct indexes', () => {
    const x = [1, 2, 3, 4, 5];
    swap(x, 1, 3);
    expect(x).toEqual([1, 4, 3, 2, 5]);
  });

  test('is a no-op when indexes are equal', () => {
    const x = [1, 2, 3];
    swap(x, 1, 1);
    expect(x).toEqual([1, 2, 3]);
  });
});
