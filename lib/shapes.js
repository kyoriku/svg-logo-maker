// Define a base class for shapes
class Shape {
  constructor() {
    // Initialize color property for the shape
    this.color = "";
  }

  // Method to set the color of the shape
  setColor(color) {
    this.color = color;
  }
}

// Class representing a Circle, extends the Shape class
class Circle extends Shape {
  // Method to render the Circle as an SVG element
  render() {
    // SVG circle element with a specified position, radius, and the color
    return `<circle cx="150" cy="100" r="100" fill="${this.color}" />`;
  }
}

// Class representing a Square, extends the Shape class
class Square extends Shape {
  // Method to render the Square as an SVG element
  render() {
    // SVG rectangle element with a specified position, width, height to form a square, and the color
    return `<rect x="50" width="200" height="200" fill="${this.color}" />`;
  }
}

// Class representing a Triangle, extends the Shape class
class Triangle extends Shape {
  // Method to render the Triangle as an SVG element
  render() {
    // SVG polygon element with specified points to form a triangle, and the color
    return `<polygon points="150,0 265.5,200 34.5,200" fill="${this.color}" />`;
  }
}

// Export the Circle, Square, and Triangle classes for external use
module.exports = {
  Circle,
  Square,
  Triangle
};