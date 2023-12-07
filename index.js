// Import necessary modules
const inquirer = require("inquirer"); // Library for handling user prompts
const fs = require("fs"); // File system module for reading and writing files
const { Circle, Square, Triangle } = require("./lib/shapes"); // Import the Circle, Square, and Triangle classes from the 'shapes' module

// Function to get user input using Inquirer prompts
function getUserInput() {
  return inquirer.prompt([
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
          // Check if the length of the input is greater than 3
        } else if (value.length > 3) {
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
  ]);
}

// Function to determine the configuration for the selected shape based on user input
function getShapeConfiguration(userInput) {
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

// Function to write SVG content to a file
function writeToFile(fileName, svgContent) {
  // Write the SVG content to a file
  fs.writeFile(fileName, svgContent, (err) => {
    if (err) {
      // If an error occurs during file writing, log the error to the console
      console.error("Error writing SVG file:", err);
    } else {
      // Log a message indicating that "logo.svg" has been generated
      console.log(`Generated ${fileName}`);
    }
  });
}

// Function to initialize the application
function init() {
  // Get user input using Inquirer prompts
  getUserInput()
    .then((userInput) => {
      // Determine the configuration for the selected shape
      const shapeConfig = getShapeConfiguration(userInput);
      // Generate SVG content based on user input and shape configuration
      const svgContent = generateSVG(shapeConfig, userInput);
      // Write the generated SVG content to a file named "logo.svg"
      writeToFile("logo.svg", svgContent);
    })
    .catch((error) => {
      // Log any errors that occur during the execution
      console.error("Error:", error);
    });
}

// Function call to start the application
init();