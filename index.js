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

function generateSVG(userInput) {
  let shape;
  let textX, textY;
  let fontSize;

  switch (userInput.shape) {
    case "Circle":
      shape = new Circle();
      textX = "50%";
      textY = "50%";
      fontSize = 60;
      break;
    case "Square":
      shape = new Square();
      textX = "50%";
      textY = "50%";
      fontSize = 60;
      break;
    case "Triangle":
      shape = new Triangle();
      textX = "50%";
      textY = "60%";
      fontSize = 50;
      break;
    default:
      throw new Error("Invalid shape");
  }

  const svgWidth = 300;
  const svgHeight = 200;

  const textColor = userInput.textColor.replace(/\s/g, '');
  const shapeColor = userInput.shapeColor.replace(/\s/g, '');
  shape.setColor(shapeColor);

  const svgContent = `
  <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    ${shape.render()}
    <text x="${textX}" y="${textY}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" alignment-baseline="middle">
      ${userInput.text}
    </text>
  </svg>
  `;

  fs.writeFileSync("logo.svg", svgContent);
}

function init() {
  getUserInput()
    .then((userInput) => {
      generateSVG(userInput);
      console.log("Generated logo.svg");
    })
    .catch((error) => console.error("Error:", error));
}

init();