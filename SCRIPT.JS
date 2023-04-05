const display = document.querySelector('.display .current');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
const backspace = document.querySelector('.backspace');
const percentage = document.querySelector('.percentage');
const historyList = document.querySelector('.history-list');
const clearHistory = document.querySelector('.clear-history');

let currentNumber = '';
let storedNumber = '';
let currentOperator = '';
let history = [];

function updateDisplay() {
  display.textContent = currentNumber;
}

function appendNumber(number) {
  currentNumber += number;
  updateDisplay();
}

function setOperator(operator) {
  if (currentNumber === '') return;
  if (currentNumber !== '' && storedNumber !== '') {
    performCalculation();
  }
  storedNumber = currentNumber;
  currentNumber = '';
  currentOperator = operator;
}

function performCalculation() {
  let result;
  const num1 = parseFloat(storedNumber);
  const num2 = parseFloat(currentNumber);

  if (isNaN(num1) || isNaN(num2)) return;

  switch (currentOperator) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        alert("Divisão por zero não é permitida.");
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }

  addToHistory(storedNumber, currentOperator, currentNumber, result);

  currentNumber = result.toString();
  storedNumber = '';
  currentOperator = '';
  updateDisplay();
}

function clearDisplay() {
  currentNumber = '';
  storedNumber = '';
  currentOperator = '';
  updateDisplay();
}

function addDecimal() {
  if (currentNumber.includes('.')) return;
  currentNumber += '.';
  updateDisplay();
}

function removeLastDigit() {
  if (currentNumber.length === 0) return;
  currentNumber = currentNumber.slice(0, -1);
  updateDisplay();
}

function calculatePercentage() {
  if (storedNumber && currentOperator) {
    const percentageValue = parseFloat(storedNumber) * parseFloat(currentNumber) / 100;
    currentNumber = percentageValue.toString();
    updateDisplay();
  }
}

function addToHistory(num1, operator, num2, result) {
  const operation = `${num1} ${operatorSymbol(operator)} ${num2} = ${result}`;
  history.push(operation);
  updateHistoryList();
}

function operatorSymbol(operator) {
  switch (operator) {
    case 'add':
      return '+';
    case 'subtract':
      return '-';
    case 'multiply':
      return '×';
    case 'divide':
      return '÷';
    default:
      return '';
  }
}

function updateHistoryList() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    historyList.appendChild(listItem);
  });
}

function clearHistoryList() {
  history = [];
  updateHistoryList();
}

numbers.forEach(number => {
  number.addEventListener('click', () => appendNumber(number.getAttribute('data-num')));
});

operators.forEach(operator => {
  operator.addEventListener('click', () => setOperator(operator.getAttribute('data-op')));
});

equals.addEventListener('click', performCalculation);
clear.addEventListener('click', clearDisplay);
decimal.addEventListener('click', addDecimal);
backspace.addEventListener('click', removeLastDigit);
percentage.addEventListener('click', calculatePercentage);
clearHistory.addEventListener('click', clearHistoryList);

function handleKeyPress(e) {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    appendNumber(e.key);
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    const operatorsMap = {
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
    };
    setOperator(operatorsMap[e.key]);
  } else if (e.key === 'Enter' || e.key === '=') {
    performCalculation();
  } else if (e.key === 'Backspace' || e.key === 'Delete') {
    removeLastDigit();
  } else if (e.key === '%') {
    calculatePercentage();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
}

document.addEventListener('keydown', handleKeyPress);
