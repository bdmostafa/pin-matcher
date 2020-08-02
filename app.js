// Variables =========================================================
let digitCount = 0;
let tryCount = 3;
const min = 1000;
const max = 9999;

// Selectors ===========================================================
const displayPin = document.querySelector('.display-pin');
const generateBtn = document.querySelector('.generate-btn');
const submitBtn = document.querySelector('.submit-btn');
const digitBtn = document.querySelectorAll('.button');
const displayDigit = document.querySelector('.display-digit');
const successMessage = document.querySelector('.success-message');
const wrongMessage = document.querySelector('.wrong-message');
const tryLeft = document.querySelector('.action-left');



// Event Listeners ======================================================
document.addEventListener('DOMContentLoaded', submitDisabled);
generateBtn.addEventListener('click', generatePin);
digitBtn.forEach((digit) => digit.addEventListener('click', addDigit));
submitBtn.addEventListener('click', submitPin);


// Functions ===========================================================

// When loading, SUBMIT button disabled until generate PIN
function submitDisabled() {
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
}

// Function to generate PIN in range of 1-4 digit
function generatePin() {
    //The maximum and the minimum both are inclusive
    const resultPin = Math.floor(Math.random() * (max - min + 1)) + min;
    displayPin.value = resultPin;
    displayDigit.value = '';

    // Submit button enabled when generating PIN
    submitBtn.disabled = false;
    submitBtn.classList.remove('disabled');
}

// Function to add digits into display input on submit section
function addDigit(event) {
    // If generatePin is not found, assigning digit/value is not allowed
    if (!displayPin.value) {
        return alert('Please generate PIN at first!');
    }

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

function submitPin(event) {
    if (displayPin.value === displayDigit.value) {
        successMessage.style.display = 'block';
        tryLeft.style.display = 'none';
        submitDisabled();
    } else {
        wrongMessage.style.display = 'block';
        displayDigit.value = '';
        digitCount = 0;

        while (tryCount > 0)
            tryLeft.innerText = `${tryCount} try left`;
        tryCount--;

        if (tryCount === 0) {
            submitDisabled();
            return alert('Oops! Please try again.');
        }
    }
}