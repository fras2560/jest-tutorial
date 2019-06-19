const Rectangle = require('./Rectangle').Rectangle;

test('1 X 1 Rectangle area is 1', () => {
  const rectangle = new Rectangle(1, 1);
  expect(rectangle.area()).toBe(1);
});