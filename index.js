const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Square, Triangle } = require("./lib/shapes");

function getUserInput() {
  return inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "Enter up to three characters for the text:",
      validate: (value) => {
        if (value.trim() === "") {
          return "Text cannot be empty";
        } else if (value.length > 3) {
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
  ]);
}

function getShapeConfiguration(userInput) {
  let shape, textX, textY, fontSize;

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

  return { shape, textX, textY, fontSize };
}

function generateSVG(shapeConfig, userInput) {
  const { shape, textX, textY, fontSize } = shapeConfig;
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

  return svgContent;
}

function writeToFile(fileName, svgContent) {
  fs.writeFile(fileName, svgContent, (err) => {
    if (err) {
      console.error("Error writing SVG file:", err);
    } else {
      console.log(`Generated ${fileName}`);
    }
  });
}

function init() {
  getUserInput()
    .then((userInput) => {
      const shapeConfig = getShapeConfiguration(userInput);
      const svgContent = generateSVG(shapeConfig, userInput);
      writeToFile("logo.svg", svgContent);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

init();
