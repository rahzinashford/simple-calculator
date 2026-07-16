const firstNumberInput = document.querySelector('#first-number');
const secondNumberInput = document.querySelector('#second-number');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('#clear-button');
const errorMessage = document.querySelector('#error-message');
const resultDisplay = document.querySelector('#result');

let lastOperation = 'add';

// Convert input values into numbers and show helpful messages for invalid input.
function getInputNumbers() {
  const firstValue = firstNumberInput.value.trim();
  const secondValue = secondNumberInput.value.trim();

  if (firstValue === '' || secondValue === '') {
    showError('Please enter both numbers before calculating.');
    return null;
  }

  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    showError('Please enter valid numbers only.');
    return null;
  }

  return { firstNumber, secondNumber };
}

function calculate(operation) {
  lastOperation = operation;
  clearMessage();

  const numbers = getInputNumbers();
  if (!numbers) {
    resultDisplay.textContent = '—';
    return;
  }

  const { firstNumber, secondNumber } = numbers;
  let result;

  if (operation === 'add') {
    result = firstNumber + secondNumber;
  } else if (operation === 'subtract') {
    result = firstNumber - secondNumber;
  } else if (operation === 'multiply') {
    result = firstNumber * secondNumber;
  } else if (operation === 'divide') {
    if (secondNumber === 0) {
      showError('Division by zero is not allowed. Try another number.');
      resultDisplay.textContent = '—';
      return;
    }
    result = firstNumber / secondNumber;
  }

  resultDisplay.textContent = formatResult(result);
}

// Keep whole numbers clean and limit decimal answers to two places.
function formatResult(value) {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  return value.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearMessage() {
  errorMessage.textContent = '';
}

function clearCalculator() {
  firstNumberInput.value = '';
  secondNumberInput.value = '';
  resultDisplay.textContent = '—';
  clearMessage();
  firstNumberInput.focus();
}

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculate(button.dataset.operation);
  });
});

clearButton.addEventListener('click', clearCalculator);

// Pressing Enter repeats the most recently selected operation.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    calculate(lastOperation);
  }
});
