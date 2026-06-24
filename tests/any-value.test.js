import anyValue from '../src/app/utils/any-value';

describe('anyValue', () => {
  const matcher = (x) => x === 'hello';

  test.each([
    ['direct match', 'hello', true],
    ['direct no-match', 'world', false],
  ])('%s', (_desc, input, expected) => {
    expect(anyValue(input, matcher)).toBe(expected);
  });

  describe('arrays', () => {
    test('matches when item is present', () => {
      expect(anyValue(['hello', 'world'], matcher)).toBe(true);
    });

    test('returns false when no item matches', () => {
      expect(anyValue(['foo', 'bar'], matcher)).toBe(false);
    });

    test('matches in nested arrays', () => {
      expect(anyValue(['foo', ['hello', 'world']], matcher)).toBe(true);
    });
  });

  describe('objects', () => {
    test('matches on a value', () => {
      expect(anyValue({ foo: 'hello' }, matcher)).toBe(true);
    });

    test('returns false when no value matches', () => {
      expect(anyValue({ foo: 'world' }, matcher)).toBe(false);
    });

    test('does not match on keys', () => {
      expect(anyValue({ hello: 'world' }, matcher)).toBe(false);
    });

    test('matches in nested objects', () => {
      expect(anyValue({ foo: { bar: 'hello' } }, matcher)).toBe(true);
    });

    test('matches in a list inside an object', () => {
      expect(anyValue({ foo: ['hello', 'world'] }, matcher)).toBe(true);
    });
  });
});
