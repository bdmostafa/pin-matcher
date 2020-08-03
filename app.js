// Variables =========================================================
let digitCount = 0;
let tryCount = 3;
const min = 1000;
const max = 9999;
let isSubmitClicked = false;

// Selectors ===========================================================
const displayPin = document.querySelector('.display-pin');
const generateBtn = document.querySelector('.generate-btn');
const submitBtn = document.querySelector('.submit-btn');
const digitBtn = document.querySelectorAll('.button');
const displayDigit = document.querySelector('.display-digit');
const successMessage = document.querySelector('.success-message');
const wrongMessage = document.querySelector('.wrong-message');
const clearAllBtn = document.querySelector('.clearAll');
const deleteBtn = document.querySelector('.deleteLeft');
const tryLeft = document.querySelector('.action-left');



// Event Listeners ======================================================
document.addEventListener('DOMContentLoaded', submitDisabled);
generateBtn.addEventListener('click', generatePin);
digitBtn.forEach((digit) => digit.addEventListener('click', addDigit));
clearAllBtn.addEventListener('click', clearAll);
deleteBtn.addEventListener('click', deleteLeft);
submitBtn.addEventListener('click', submitPin);


// Functions ===========================================================

// When loading, SUBMIT button disabled until generate PIN
function submitDisabled() {
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');

    // Submit button enabled when generating PIN
    if (displayPin.value) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
    }
}

// Function to generate PIN in range of 1-4 digit
function generatePin() {
    // debugger;
    //The maximum and the minimum both are inclusive
    const resultPin = Math.floor(Math.random() * (max - min + 1)) + min;
    displayPin.value = resultPin;
    // displayDigit.value = '';

    notifyMessage();
    submitDisabled();
    digitCount = 0;
    tryCount = 3;
    tryLeft.innerText = `${tryCount} try left`;
}

// Function to add digits into display input on submit section
function addDigit(event) {

    alertMessage()
    // When numbers exceeds 4 digits, stop assign value into the display input
    const digit = event.target.innerText;
    if (digitCount <= 3 && digit !== '<' && digit !== 'C') {
        displayDigit.value += digit;
        digitCount++;
    }
}

// Function to delete one digit from left event
function deleteLeft() {

}

// Function to clear all display digits in the input
function clearAll() {
    digitCount = 0;
    displayDigit.value = '';
}

function submitPin() {
    isSubmitClicked = true;
    notifyMessage();
    submitDisabled();
    digitCount = 0;

}

function notifyMessage() {
    successMessage.style.display = 'none';
    wrongMessage.style.display = 'none';
    tryLeft.style.display = 'block';

    // If submitBtn is clicked, process notify message 
    if (isSubmitClicked) {
        if (displayPin.value === displayDigit.value) {
            successMessage.style.display = 'block';
            displayPin.value = '';
            displayDigit.value = '';
            tryLeft.style.display = 'none';
        } else {
            wrongMessage.style.display = 'block';
            --tryCount;
            tryLeft.innerText = `${tryCount} try left`;
            alertMessage();
            displayDigit.value = '';
        }
    }

    // Finishing notifyMessages again assign 'false' to isSubmitClicked
    isSubmitClicked = false;

}

function alertMessage() {
    // If generatePin is not found, assigning digit/value is not allowed
    if (!displayPin.value) {
        return alert('Please generate PIN at first!');
    }

    // If anyone click SUBMIT button without input a PIN, alert message
    if (!displayDigit.value) {
        alert('Please input a PIN before submitting!')
    }

    // When 3 times trying, alert this and program reset
    if (tryCount <= 0) {
        alert('Oops! You have tried 3 times. Please generate PIN again.');
        displayPin.value = '';
        tryLeft.innerText = '';
        wrongMessage.style.display = 'none';
    }
}