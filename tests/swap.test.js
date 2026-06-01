import swap from './swap';

describe('swap', function() {
  it('swaps distinct indexes', function() {
    var x = [1, 2, 3, 4, 5];
    swap(x, 1, 3);
    expect(x).toEqual([1, 4, 3, 2, 5]);
  });

  it('swaps equal indexes', function() {
    var x = [1, 2, 3];
    swap(x, 1, 1);
    expect(x).toEqual([1, 2, 3]);
  });
});
