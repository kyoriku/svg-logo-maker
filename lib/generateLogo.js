// Import the Circle, Square, and Triangle classes from the 'shapes' module
const { Circle, Square, Triangle } = require("./shapes");

// Function to determine the configuration for the selected shape based on user input
function getShapeConfig(userInput) {
  let shape, textX, textY, fontSize;

  // Switch statement to create the appropriate shape based on user input
  switch (userInput.shape) {
    case "Circle":
      shape = new Circle(); // Create a Circle object
      textX = "50%"; // Set text X position for Circle
      textY = "50%"; // Set text Y position for Circle
      fontSize = 60;
      break;
    case "Square":
      shape = new Square(); // Create a Square object
      textX = "50%"; // Set text X position for Square
      textY = "50%"; // Set text Y position for Square
      fontSize = 60;
      break;
    case "Triangle":
      shape = new Triangle(); // Create a Triangle object
      textX = "50%"; // Set text X position for Triangle
      textY = "60%"; // Set text Y position for Triangle
      fontSize = 50;
      break;
    // Throw an error for an invalid shape
    default:
      throw new Error("Invalid shape");
  }

  // Return the configuration for the selected shape
  return { shape, textX, textY, fontSize };
}

// Function to generate SVG content based on user input and shape configuration
function generateSVG(shapeConfig, userInput) {
  const { shape, textX, textY, fontSize } = shapeConfig;
  // Define constants for SVG dimensions
  const svgWidth = 300;
  const svgHeight = 200;
  // Set text color based on user input, removing spaces for colors that are entered as 2 words (for example: dark grey)
  const textColor = userInput.textColor.replace(/\s/g, '');
  // Set shape color based on user input, removing spaces for colors that are entered as 2 words (for example: light blue)
  const shapeColor = userInput.shapeColor.replace(/\s/g, '');

  // Apply the user-defined color to the shape
  shape.setColor(shapeColor);

  // Generate SVG content using template literals
  const svgContent = `
    <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="${textX}" y="${textY}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" alignment-baseline="middle">
        ${userInput.text}
      </text>
    </svg>
  `;

  // Return the generated SVG content
  return svgContent;
}

// Export getShapeConfig and generateSVG functions for external use
module.exports = { getShapeConfig, generateSVG };