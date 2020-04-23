var when = require('../build/index');

var val = 2;

test('return second case when it matches', () => {
  expect(
    when
      .case(val === 1, 'the value is 1')
      .case(val === 2, 'the value is 2')
      .resolve('the value does not match any case'),
  ).toBe('the value is 2');
});

test('by calling resolve twice, it returns false', () => {
  expect(when.resolve()).toBeFalsy();
});

test('when can also use functions', () => {
  expect(
    when
      .case(val === 1, () => 'it returns 1')
      .case(val === 2, () => 'it returns 2')
      .resolve(),
  ).toBe('it returns 2');
});

test('it can be resolved later', () => {
  when
    .case(val === 1, () => 'it returns 1')
    .case(val === 2, () => 'it returns 2');

  expect(when.resolve()).toBe('it returns 2');
});

test('if no case matches, it returns false', () => {
  when
    .case(val === 1, () => 'it returns 1')
    .case(val === 10, () => 'it returns 10');

  expect(when.resolve()).toBeFalsy();
});

test('resolve can return a default value if there is not a matching case', () => {
  expect(
    when
      .case(val === 1, () => 'val matches the first case')
      .case(val === 10, () => 'val matches the second case')
      .case(val === 20, () => 'val matches the third case')
      .resolve(() => 'there is not a matching case'),
  ).toBe('there is not a matching case');
});
