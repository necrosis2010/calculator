let currentDisplay = "";
let operands = [];
let operators = [];
let operand1;
let operand2;
let result = 0;

let keys = document.querySelector(".content-action");
keys.addEventListener("click", buttonClick);

function buttonClick(e) {
  let content = e.target;
  if (content.classList.contains("operand")) {
    if (currentDisplay.includes(".") && content.classList.contains("decimal")) {
      console.log("error");
    } else {
      currentDisplay += content.innerText;
      display(currentDisplay);
    }
  } else if (content.classList.contains("operator")) {
    calculate(content.innerText);
  } else if (content.classList.contains("equals")) {
    getResult();
  } else if (content.classList.contains("remove-content")) {
    clearScreen();
  }
}

document.addEventListener("keydown", function (e) {
  if ((e.key >= "0" && e.key <= "9") || e.key == ".") {
    let keyValue = e.key.toString();
    currentDisplay += keyValue;
    display(currentDisplay);
  } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
    calculate(e.key);
  } else if (e.key == "Enter") {
    getResult();
  } else if (e.key == "Backspace") {
    clearScreen();
  }
});

function display(content) {
  if (content.length > 9) {
    content = content.substr(0, 9);
  }
  document.querySelector(".content-display").innerText = content;
}

function calculate(operator) {
  if (currentDisplay !== "") {
    operands.push(currentDisplay);
  }
  if (operands.length === 0) {
    operands.push(0);
  }
  currentDisplay = "";

  operators.push(operator);

  if (operands.length === 2) {
    operand2 = parseFloat(operands.pop());
    operand1 = parseFloat(operands.pop());

    immediateOperator = operators.shift();
    switch (immediateOperator) {
      case "+":
        result = operand1 + operand2;
        break;

      case "-":
        result = operand1 - operand2;
        break;

      case "*":
        result = operand1 * operand2;
        break;

      case "/":
        result = operand1 / operand2;
        break;
    }
    result = result.toString();
    if (result.length > 9 && parseFloat(result) > 999999999) {
      let mantissa = result.substr(0, 1);
      let characteristic = result.substr(1, 4);
      let index = result.substr(1).length.toString();
      result = mantissa + "." + characteristic + "e" + index;
    } else {
      result = result.substr(0, 9);
    }
    operands.push(result);
    display(result);
  } else {
    return;
  }
}

function getResult() {
  calculate(operators[0]);
  operators = [];
}

function clearScreen() {
  display("0");
  currentDisplay = "";
  operands = [];
  operators = [];
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
