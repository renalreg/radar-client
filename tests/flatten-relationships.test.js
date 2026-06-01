import flattenRelationships from '../src/app/utils/flatten-relationships';

describe('flattenRelationships', () => {
  test.each([
    ['empty object', {}, {}],
    ['empty array',  [], []],
  ])('handles %s', (_desc, input, expected) => {
    expect(flattenRelationships(input)).toEqual(expected);
  });

  test('leaves top-level primitives untouched', () => {
    expect(flattenRelationships({ id: 123, foo: 'bar' })).toEqual({ id: 123, foo: 'bar' });
  });

  test('replaces a child object that has an id with that id', () => {
    expect(flattenRelationships({
      id: 123,
      foo: { id: 456, hello: 'world' },
    })).toEqual({ id: 123, foo: 456 });
  });

  test('replaces grandchild objects but preserves intermediate objects without an id', () => {
    expect(flattenRelationships({
      id: 123,
      foo: {
        hello: 'world',
        bar: { id: 789, hello: 'world' },
      },
    })).toEqual({ id: 123, foo: { hello: 'world', bar: 789 } });
  });

  test('flattening a child object also discards its own nested children', () => {
    expect(flattenRelationships({
      id: 123,
      foo: {
        id: 456,
        bar: { id: 789, hello: 'world' },
      },
    })).toEqual({ id: 123, foo: 456 });
  });

  test('replaces each item in a child array with its id', () => {
    expect(flattenRelationships({
      id: 123,
      foo: [
        { id: 1, hello: 'world' },
        { id: 2, hello: 'world' },
        { id: 3, hello: 'world' },
      ],
    })).toEqual({ id: 123, foo: [1, 2, 3] });
  });

  test('flattens nested objects inside a child array', () => {
    expect(flattenRelationships({
      id: 123,
      foo: [
        { bar: { id: 123, hello: 'world' } },
        { bar: { id: 456, hello: 'world' } },
        { bar: { id: 789, hello: 'world' } },
      ],
    })).toEqual({
      id: 123,
      foo: [{ bar: 123 }, { bar: 456 }, { bar: 789 }],
    });
  });
});
