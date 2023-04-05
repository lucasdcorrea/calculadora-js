const displayCurrent = document.querySelector('.display .current');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');
const historyList = document.querySelector('.history-list');

let currentValue = '';
let storedValue = '';
let currentOperator = '';
let isOperatorActive = false;

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (isOperatorActive) {
            currentValue = '';
            isOperatorActive = false;
        }

        if (currentValue.length < 12) {
            currentValue += button.dataset.num;
            updateDisplay(currentValue);
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator && currentValue) {
            storedValue = calculate(storedValue, currentOperator, currentValue);
            updateDisplay(storedValue);
        } else if (!storedValue && currentValue) {
            storedValue = currentValue;
        }

        currentOperator = button.dataset.op;
        isOperatorActive = true;
    });
});

clearButton.addEventListener('click', () => {
    currentValue = '';
    storedValue = '';
    currentOperator = '';
    updateDisplay('0');
});

decimalButton.addEventListener('click', () => {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay(currentValue);
    }
});

equalsButton.addEventListener('click', () => {
    if (currentOperator && storedValue && currentValue) {
        const result = calculate(storedValue, currentOperator, currentValue);
        updateDisplay(result);

        addToHistory(storedValue, currentOperator, currentValue, result);

        currentValue = result;
        storedValue = '';
        currentOperator = '';
    }
});

function updateDisplay(value) {
    displayCurrent.textContent = value;
}

function calculate(a, operator, b) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (operator) {
        case 'add':
            return (numA + numB).toString();
        case 'subtract':
            return (numA - numB).toString();
        case 'multiply':
            return (numA * numB).toString();
        case 'divide':
            return (numA / numB).toString();
        default:
            return '';
    }
}

function addToHistory(a, operator, b, result) {
    const listItem = document.createElement('li');
    listItem.textContent = `${a} ${getOperatorSymbol(operator)} ${b} = ${result}`;
    historyList.prepend(listItem);
}

function getOperatorSymbol(operator) {
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
