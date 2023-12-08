// Import necessary modules
const inquirer = require("inquirer"); // Library for handling user prompts
const fs = require("fs"); // File system module for reading and writing files
const { getShapeConfig, generateSVG } = require("./lib/generateLogo"); // Import getShapeConfig and generateSVG functions from the 'generateLogo' module

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
      const shapeConfig = getShapeConfig(userInput);
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