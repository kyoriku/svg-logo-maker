const { Circle, Square, Triangle } = require('./shapes');

describe('Circle', () => {
  test('Circle should render SVG circle element with the correct color', () => {
    const shape = new Circle();
    shape.setColor('red');
    expect(shape.render()).toEqual('<circle cx="150" cy="100" r="100" fill="red" />');
  });
});