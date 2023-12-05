// Import necessary modules
const inquirer = require("inquirer"); // Library for handling user prompts
const fs = require("fs"); // File system module for reading and writing files
const { Circle, Square, Triangle } = require("./lib/shapes"); // Import the Circle, Square, and Triangle classes from the 'shapes' module

// Function to get user input using Inquirer
function getUserInput() {
  return new Promise((resolve, reject) => {
    // Prompt the user for input using Inquirer
    inquirer
      .prompt([
        // Prompt for entering up to three characters for text
        {
          type: "input",
          name: "text",
          message: "Enter up to three characters for the text:",
          // Validation function to ensure non-empty and up to three characters input
          validate: (value) => {
            // Check if the trimmed value is empty
            if (value.trim() === "") {
              return "Text cannot be empty"; // Return an error message for empty text
            }
            // Check if the length of the input is greater than 3
            else if (value.length > 3) {
              return "Please enter only up to three characters"; // Return an error message for exceeding three characters
            }
            return true; // Input is valid
          },
        },
        // Prompt for entering text color (keyword or hexadecimal)
        {
          type: "input",
          name: "textColor",
          message: "Enter text color (keyword or hexadecimal):",
          // Validation function to ensure non-empty text color input
          validate: (value) => {
            // Check if the trimmed value is empty
            if (value.trim() === "") {
              return "Text color cannot be empty"; // Return an error message for empty text color
            }
            return true; // Input is valid
          },
        },
        // Prompt for choosing a shape
        {
          type: "list",
          name: "shape",
          message: "Choose a shape:",
          choices: ["Circle", "Square", "Triangle"],
        },
        // Prompt for entering shape color (keyword or hexadecimal)
        {
          type: "input",
          name: "shapeColor",
          message: "Enter shape color (keyword or hexadecimal):",
          // Validation function to ensure non-empty shape color input
          validate: (value) => {
            // Check if the trimmed value is empty
            if (value.trim() === "") {
              return "Shape color cannot be empty"; // Return an error message for empty shape color
            }
            return true; // Input is valid
          },
        },
      ])
      .then((userInput) => {
        // Resolve with user input if all inputs are valid
        resolve(userInput);
      })
      .catch((error) => reject(error)); // Reject with an error if there's an issue with Inquirer
  });
}

// Function to generate SVG based on user input
function generateSVG(userInput) {
  let shape;
  let textX, textY;
  let fontSize;

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
  
  // Define constants for SVG dimensions
  const svgWidth = 300;
  const svgHeight = 200;

  // Set text color based on user input, removing spaces for colors that are entered as 2 words (for example: dark grey)
  const textColor = userInput.textColor.replace(/\s/g, '');
  // Set shape color based on user input, removing spaces for colors that are entered as 2 words (for example: light blue)
  const shapeColor = userInput.shapeColor.replace(/\s/g, '');

  // Apply the user-defined color to the shape
  shape.setColor(shapeColor);

  // Create SVG content using template literals
  const svgContent = `
  <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    ${shape.render()}
    <text x="${textX}" y="${textY}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" alignment-baseline="middle">
      ${userInput.text}
    </text>
  </svg>
  `;

  // Write SVG content to a file named "logo.svg"
  fs.writeFileSync("logo.svg", svgContent);
}

// Function to initialize app
function init() {
  // Get user input
  getUserInput()
    .then((userInput) => {
      // Generate SVG based on user input
      generateSVG(userInput);
      // Log a message indicating that "logo.svg" has been generated
      console.log("Generated logo.svg");
    })
    .catch((error) => console.error("Error:", error));
}

// Function call to initialize app
init();