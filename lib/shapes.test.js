// Import the Circle, Square, and Triangle classes from the 'shapes' module
const { Circle, Square, Triangle } = require('./shapes');

// Testing the Circle class
describe('Circle', () => {
  // Test case for the 'render' method of the Circle class
  test('Circle should render SVG circle element with the correct color', () => {
    // Create a new Circle instance
    const circle = new Circle();
    // Set the color of the Circle to 'red'
    circle.setColor('red');
    // Expect the rendered SVG string to match the expected value
    expect(circle.render()).toEqual('<circle cx="150" cy="100" r="100" fill="red" />');
  });
});

// Testing the Square class
describe('Square', () => {
  // Test case for the 'render' method of the Square class
  test('Square should render SVG rectangle element with the correct color', () => {
    // Create a new Square instance
    const square = new Square();
    // Set the color of the Square to 'green'
    square.setColor('green');
    // Expect the rendered SVG string to match the expected value
    expect(square.render()).toEqual('<rect x="50" width="200" height="200" fill="green" />');
  });
});

// Testing the Triangle class
describe('Triangle', () => {
  // Test case for the 'render' method of the Triangle class
  test('Triangle should render SVG polygon element with the correct color', () => {
    // Create a new Triangle instance
    const triangle = new Triangle();
    // Set the color of the Triangle to 'blue'
    triangle.setColor('blue');
    // Expect the rendered SVG string to match the expected value
    expect(triangle.render()).toEqual('<polygon points="150,0 265.5,200 34.5,200" fill="blue" />');
  });
});