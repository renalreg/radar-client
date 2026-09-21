import escapeRegExp from '../src/app/utils/escape-reg-exp';

describe('escapeRegExp', () => {
  test.each([
    ['.',     '\\.'],
    ['.*',    '\\.\\*'],
    ['.?',    '\\.\\?'],
    ['[abc]', '\\[abc\\]'],
    ['(abc)', '\\(abc\\)'],
    ['a{42}',   'a\\{42\\}'],
    ['a{1,42}', 'a\\{1,42\\}'],
    ['^', '\\^'],
    ['$', '\\$'],
  ])('escapes %s', (input, expected) => {
    expect(escapeRegExp(input)).toBe(expected);
  });
});
