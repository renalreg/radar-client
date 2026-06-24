import { camelCaseKeys, snakeCaseKeys } from '../src/app/utils/transform-keys';


describe('camelCaseKeys', () => {
  test.each([
    ['empty object', {}, {}],
    ['empty array',  [], []],
  ])('handles %s', (_desc, input, expected) => {
    expect(camelCaseKeys(input)).toEqual(expected);
  });

  test('converts snake_case keys on a flat object', () => {
    expect(camelCaseKeys({ key_one: 'key_one', key_two: 'key_two' })).toEqual({
      keyOne: 'key_one',
      keyTwo: 'key_two',
    });
  });

  test('converts keys recursively in nested objects', () => {
    expect(camelCaseKeys({
      key_one: { key_one_one: 'value_one_one', key_one_two: 'value_one_two' },
      key_two: { key_two_one: 'value_two_one', key_two_two: 'value_two_two' },
    })).toEqual({
      keyOne: { keyOneOne: 'value_one_one', keyOneTwo: 'value_one_two' },
      keyTwo: { keyTwoOne: 'value_two_one', keyTwoTwo: 'value_two_two' },
    });
  });

  test('converts keys in a list of objects', () => {
    expect(camelCaseKeys([
      { item_one_key_one: 'item_one_value_one', item_one_key_two: 'item_one_value_two' },
      { item_two_key_one: 'item_two_value_one', item_two_key_two: 'item_two_value_two' },
    ])).toEqual([
      { itemOneKeyOne: 'item_one_value_one', itemOneKeyTwo: 'item_one_value_two' },
      { itemTwoKeyOne: 'item_two_value_one', itemTwoKeyTwo: 'item_two_value_two' },
    ]);
  });

  test('leaves SCREAMING_SNAKE_CASE constants unchanged', () => {
    expect(camelCaseKeys({ KEY_1: 'value_1', KEY_2: 'value_2' })).toEqual({
      KEY_1: 'value_1',
      KEY_2: 'value_2',
    });
  });
});

describe('snakeCaseKeys', () => {
  test.each([
    ['empty object', {}, {}],
    ['empty array',  [], []],
  ])('handles %s', (_desc, input, expected) => {
    expect(snakeCaseKeys(input)).toEqual(expected);
  });

  test('converts camelCase keys on a flat object', () => {
    expect(snakeCaseKeys({ keyOne: 'keyOne', keyTwo: 'keyTwo' })).toEqual({
      key_one: 'keyOne',
      key_two: 'keyTwo',
    });
  });

  test('converts keys recursively in nested objects', () => {
    expect(snakeCaseKeys({
      keyOne: { keyOneOne: 'valueOneOne', keyOneTwo: 'valueOneTwo' },
      keyTwo: { keyTwoOne: 'valueTwoOne', keyTwoTwo: 'valueTwoTwo' },
    })).toEqual({
      key_one: { key_one_one: 'valueOneOne', key_one_two: 'valueOneTwo' },
      key_two: { key_two_one: 'valueTwoOne', key_two_two: 'valueTwoTwo' },
    });
  });

  test('converts keys in a list of objects', () => {
    expect(snakeCaseKeys([
      { itemOneKeyOne: 'itemOneValueOne', itemOneKeyTwo: 'itemOneValueTwo' },
      { itemTwoKeyOne: 'itemTwoValueOne', itemTwoKeyTwo: 'itemTwoValueTwo' },
    ])).toEqual([
      { item_one_key_one: 'itemOneValueOne', item_one_key_two: 'itemOneValueTwo' },
      { item_two_key_one: 'itemTwoValueOne', item_two_key_two: 'itemTwoValueTwo' },
    ]);
  });

  test('leaves ALL_CAPS constants unchanged', () => {
    expect(snakeCaseKeys({ KEY1: 'value1', KEY2: 'value2' })).toEqual({
      KEY1: 'value1',
      KEY2: 'value2',
    });
  });
});
