import compare from './compare';

describe('compare', function() {
  function sort(x) {
    return x.sort(compare);
  }

  it('sorts an empty array', function() {
    expect(sort([])).toEqual(sort([]));
  });

  it('sorts numbers', function() {
    expect(sort([3, 2, 1])).toEqual([1, 2, 3]);
  });

  it('sorts strings', function() {
    expect(sort(['c', 'a', 'b'])).toEqual(['a', 'b', 'c']);
  });

  it('sorts arrays', function() {
    expect(sort([[101, 'b'], [11, 'c'], [101, 'a']])).toEqual([[11, 'c'], [101, 'a'], [101, 'b']]);
  });

  it('sorts arrays of uneven length', function() {
    expect(sort([[1, 2, 3], [1, 2]])).toEqual([[1, 2], [1, 2, 3]]);
  });
});
