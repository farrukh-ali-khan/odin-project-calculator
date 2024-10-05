let display = document.getElementById("display");
let currentInput = "";
let operator = "";
let firstNumber = null;
let secondNumber = null;
let shouldResetDisplay = false;
let decimalAdded = false;

// Append number to display
function appendNumber(number) {
  if (display.innerText === "0" || shouldResetDisplay) {
    display.innerText = number;
    shouldResetDisplay = false;
  } else {
    display.innerText += number;
  }
  currentInput = display.innerText;
}

// Append operator and store first number
function appendOperator(op) {
  if (firstNumber === null) {
    firstNumber = parseFloat(currentInput);
  } else if (operator) {
    secondNumber = parseFloat(currentInput);
    firstNumber = operate(firstNumber, operator, secondNumber);
    display.innerText = roundResult(firstNumber);
  }
  operator = op;
  shouldResetDisplay = true;
  decimalAdded = false; // Allow decimal for new input
}

// Clear all data
function clearDisplay() {
  display.innerText = "0";
  currentInput = "";
  firstNumber = null;
  secondNumber = null;
  operator = "";
  shouldResetDisplay = false;
  decimalAdded = false;
}

// Backspace to delete last character
function deleteNumber() {
  display.innerText = display.innerText.slice(0, -1);
  if (display.innerText === "") {
    display.innerText = "0";
  }
}

// Add decimal point (only one allowed)
function appendDecimal() {
  if (!decimalAdded) {
    display.innerText += ".";
    decimalAdded = true;
  }
}

// Calculate result when '=' is pressed
function calculate() {
  if (operator && currentInput !== "") {
    secondNumber = parseFloat(currentInput);
    let result = operate(firstNumber, operator, secondNumber);
    display.innerText = roundResult(result);
    firstNumber = result; // Store result for further calculations
    operator = "";
    shouldResetDisplay = true;
    decimalAdded = false;
  }
}

// Operation logic
function operate(num1, op, num2) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error";
    default:
      return num1;
  }
}

// Round long decimals to 2 places
function roundResult(result) {
  return Math.round(result * 100) / 100;
}

// Keyboard support
window.addEventListener("keydown", function (e) {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendDecimal();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "=" || e.key === "Enter") calculate();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    appendOperator(e.key);
  if (e.key.toLowerCase() === "c") clearDisplay();
});
