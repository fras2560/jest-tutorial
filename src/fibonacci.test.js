const fibonacci = require('./fibonacci');


test('Fibonacci F(3) = 2', () => {
  expect(fibonacci(3)).toBe(3);
});

test('Fibonacci F(1) = 1', () => {
  expect(fibonacci(1)).toBe(1);
});

test('Fibonacci F(0) = 1', () => {
  expect(fibonacci(0)).toBe(1);
});

test('Fibonacci F(2) = 2', () => {
  expect(fibonacci(2)).toBe(2);
});