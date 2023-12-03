const { Circle, Square, Triangle } = require('./shapes');

describe('Circle', () => {
  test('Circle should render SVG circle element with the correct color', () => {
    const circle = new Circle();
    circle.setColor('red');
    expect(circle.render()).toEqual('<circle cx="150" cy="100" r="100" fill="red" />');
  });
});

describe('Square', () => {
  test('Square should render SVG rectangle element with the correct color', () => {
    const square = new Square();
    square.setColor('green');
    expect(square.render()).toEqual('<rect x="50" width="200" height="200" fill="green" />');
  });
});

describe('Triangle', () => {
  test('Triangle should render SVG polygon element with the correct color', () => {
    const triangle = new Triangle();
    triangle.setColor('blue');
    expect(triangle.render()).toEqual('<polygon points="150,0 265.5,200 34.5,200" fill="blue" />');
  });
});