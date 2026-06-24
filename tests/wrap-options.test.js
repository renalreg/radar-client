import {
  toRadioView as toRadioViewFactory,
  toRadioModel as toRadioModelFactory,
  wrapRadioOptions as wrapRadioOptionsFactory,
  toSelectModel as toSelectModelFactory,
  toSelectView as toSelectViewFactory,
  wrapSelectOptions as wrapSelectOptionsFactory,
} from '../src/app/utils/wrap-options';

// ─── lightweight mock for Angular $parse ─────────────────────────────────────
const $parse = (expr) => (obj) => obj?.[expr];

// ─── instantiate ALL factories properly ───────────────────────────────────────
const toRadioView = toRadioViewFactory();
const toRadioModel = toRadioModelFactory();
const wrapRadioOptions = wrapRadioOptionsFactory();

const toSelectModel = toSelectModelFactory();
const toSelectView = toSelectViewFactory($parse);
const wrapSelectOptions = wrapSelectOptionsFactory(toSelectView);

// ─── tests ────────────────────────────────────────────────────────────────────

describe('toRadioView', () => {
  test('extracts id from a model object', () => {
    expect(toRadioView({ id: 123 })).toEqual(123);
  });

  test('passes a string through unchanged', () => {
    expect(toRadioView('hello')).toEqual('hello');
  });
});

describe('toRadioModel', () => {
  const options = [
    { id: 1, value: 'foo' },
    { id: 2, value: 'bar' },
    { id: 3, value: 'baz' },
  ];

  test('returns the object matching a given id', () => {
    expect(toRadioModel(options, 2)).toEqual({ id: 2, value: 'bar' });
  });

  test('returns a string value directly', () => {
    expect(toRadioModel(['foo', 'bar', 'baz'], 'bar')).toEqual('bar');
  });
});

describe('wrapRadioOptions', () => {
  test('handles an empty list', () => {
    expect(wrapRadioOptions([])).toEqual([]);
  });

  test('wraps strings as { id, label }', () => {
    expect(wrapRadioOptions(['foo', 'bar', 'baz'])).toEqual([
      { id: 'foo', label: 'foo' },
      { id: 'bar', label: 'bar' },
      { id: 'baz', label: 'baz' },
    ]);
  });

  test('passes objects through unchanged', () => {
    const opts = [
      { id: 1, label: 'foo' },
      { id: 2, label: 'bar' },
      { id: 3, label: 'baz' },
    ];
    expect(wrapRadioOptions(opts)).toEqual(opts);
  });
});

describe('toSelectModel', () => {
  test.each([
    [null, null],
    [undefined, null],
  ])('returns null for %s', (input, expected) => {
    expect(toSelectModel(input)).toBe(expected);
  });

  test('unwraps an object selection to its value', () => {
    expect(
      toSelectModel({
        id: 1,
        label: 'foo',
        value: { id: 1, label: 'foo' },
      })
    ).toEqual({ id: 1, label: 'foo' });
  });

  test('unwraps a string selection to its string value', () => {
    expect(
      toSelectModel({
        id: 'foo',
        label: 'foo',
        value: 'foo',
      })
    ).toEqual('foo');
  });
});

describe('toSelectView', () => {
  test.each([
    [null, null],
    [undefined, null],
  ])('returns null for %s', (input, expected) => {
    expect(toSelectView(input)).toBe(expected);
  });

  test('wraps a string as { id, label, value }', () => {
    expect(toSelectView('hello')).toEqual({
      id: 'hello',
      label: 'hello',
      value: 'hello',
    });
  });

  test('wraps an object correctly', () => {
    expect(toSelectView({ id: 1, label: 'foo' })).toEqual({
      id: 1,
      label: 'foo',
      value: { id: 1, label: 'foo' },
    });
  });
});

describe('wrapSelectOptions', () => {
  test('handles empty list', () => {
    expect(wrapSelectOptions([])).toEqual([]);
  });

  test('wraps strings', () => {
    expect(wrapSelectOptions(['foo', 'bar'])).toEqual([
      { id: 'foo', label: 'foo', value: 'foo' },
      { id: 'bar', label: 'bar', value: 'bar' },
    ]);
  });

  test('wraps objects', () => {
    expect(
      wrapSelectOptions([
        { id: 1, label: 'foo' },
        { id: 2, label: 'bar' },
      ])
    ).toEqual([
      { id: 1, label: 'foo', value: { id: 1, label: 'foo' } },
      { id: 2, label: 'bar', value: { id: 2, label: 'bar' } },
    ]);
  });
});
