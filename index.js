const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Square, Triangle } = require("./lib/shapes");

function getUserInput() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "text",
          message: "Enter up to three characters for the text:",
          validate: (value) => {
            if (value.trim() === "") {
              return "Text cannot be empty";
            }
            else if (value.length > 3) {
              return "Please enter only up to three characters";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "textColor",
          message: "Enter text color (keyword or hexadecimal):",
          validate: (value) => {
            if (value.trim() === "") {
              return "Text color cannot be empty";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "shape",
          message: "Choose a shape:",
          choices: ["Circle", "Square", "Triangle"],
        },
        {
          type: "input",
          name: "shapeColor",
          message: "Enter shape color (keyword or hexadecimal):",
          validate: (value) => {
            if (value.trim() === "") {
              return "Shape color cannot be empty";
            }
            return true;
          },
        },
      ])
      .then((userInput) => {
        resolve(userInput);
      })
      .catch((error) => reject(error));
  });
}