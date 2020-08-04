// Global Variables =========================================================
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
const displaySubmit = document.querySelector('.display-submit');
const successMessage = document.querySelector('.success-message');
const wrongMessage = document.querySelector('.wrong-message');
const clearAllBtn = document.querySelector('.clearAll');
const deleteBtn = document.querySelector('.deleteLeft');
const tryLeft = document.querySelector('.action-left');



// Event Listeners ======================================================
document.addEventListener('DOMContentLoaded', submitDisabled);
generateBtn.addEventListener('click', generatePin);
digitBtn.forEach((digit) => digit.addEventListener('click', addDigit));
deleteBtn.addEventListener('click', deleteLeft);
clearAllBtn.addEventListener('click', clearAll);
submitBtn.addEventListener('click', submitPin);



// Functions ===========================================================

// When loading, SUBMIT button disabled until generate PIN
function submitDisabled() {
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    tryLeft.style.display = 'none';

    // Submit button enabled when generating PIN
    if (displayPin.value) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
        tryLeft.style.display = 'block';
    }
}

// Function to generate PIN in range of 1-4 digits
function generatePin() {
    //The maximum and the minimum, both are inclusive
    const resultPin = Math.floor(Math.random() * (max - min + 1)) + min;
    displayPin.value = resultPin;

    // Whenever a new PIN is generated, displaySubmit value is EMPTY 
    displaySubmit.value = '';

    // NOTIFY messages are hidden when generating PIN
    notifyMessage();
    submitDisabled();

    // When generating PIN, initial value like reloading 
    digitCount = 0;
    tryCount = 3;
    tryLeft.innerText = `${tryCount} try left`;
}

// Function to ADD digits into displaySubmit box on submit section
function addDigit(event) {
    // When input numbers exceed 4 digits, unable to press further any digit
    const digit = event.target.innerText;
    if (digitCount <= 3 && digit !== '<' && digit !== 'C') {
        displaySubmit.value += digit;
        digitCount++;

        // If generatePin is not found, ALERT to generate PIN at first
        alertMessage();
    }
}

// Function to DELETE one digit from left on displaySubmit box
function deleteLeft() {
    displaySubmit.value = displaySubmit.value.slice(0, -1);
    digitCount--;
}

// Function to CLEAR ALL displaySubmit.value in the input box
function clearAll() {
    digitCount = 0;
    displaySubmit.value = '';
}

// Function to submit PIN into the input box
function submitPin() {
    isSubmitClicked = true;

    // Show result/notify message whether it is RIGHT or WRONG
    notifyMessage();

    // SUBMIT button is active when generated PIN is shown
    submitDisabled();

    // After every SUBMIT click event, digitCount starting from ZERO (0)
    digitCount = 0;
}

// Function to NOTIFY messages and TRY actions
function notifyMessage() {
    // NOTIFY messages are hidden at first
    successMessage.style.display = 'none';
    wrongMessage.style.display = 'none';

    // If submitBtn is clicked, process notify message (success or wrong)
    if (isSubmitClicked) {
        if (displayPin.value === displaySubmit.value) {
            successMessage.style.display = 'block';
            displayPin.value = '';
            displaySubmit.value = '';
            tryLeft.style.display = 'none';
        } else {
            wrongMessage.style.display = 'block';
            --tryCount;
            tryLeft.innerText = `${tryCount} try left`;

            // Having 3 times tried, ALERT message to generate PIN again
            alertMessage();
            displaySubmit.value = '';
        }
    }
    // Again assign 'false' to isSubmitClicked
    isSubmitClicked = false;
}

// Function to ALERT various messages on different situations
function alertMessage() {

    // If generatePin is not found, assigning any digit/input is not allowed
    if (!displayPin.value) {
        alert('Please generate PIN at first!');
        digitCount = 0;
        return displaySubmit.value = '';
    }

    // If anyone click SUBMIT button without input a PIN, alert message
    if (!displaySubmit.value) {
        alert('Please press numbers before submitting!')
    }

    // Having 3 times tried, ALERT this and program RESET
    if (tryCount <= 0) {
        alert('Oops! You have tried 3 times. Please generate PIN again.');
        displayPin.value = '';
        tryLeft.innerText = '';
        wrongMessage.style.display = 'none';
    }
}