/*
Project details:
    Name: Pin-Matcher
    Author: Mostafa Al Mahmud
    Tasks/requirements to be done:
        1. Both INPUT button is disabled to edit by pointer-events
        2. Before generating PIN, SUBMIT button is disabled with low opacity and '3 TRY LEFT' text is hidden
        3. ALERT to generate PIN when any DIGIT/NUMBER is pressed without getting PIN
        4. Generate only 4 digits PIN randomly
        5. ALERT to press DIGIT/NUMBER if SUBMIT is clicked without pressing any numbers
        6. Able to input MAXIMUM 4 digits
        7. DELETE left side number when '<' is clicked and CLEAR ALL numbers when 'C' is clicked
        8. NOTIFY message when SUBMITTING whether it is right or wrong
        9. 3 TRY LEFT options for only 1 generated PIN if the answer is wrong 
        10. Program reset after 3 TRY or successful SUBMITTING
*/

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
const submitDigit = document.querySelector('.submit-digit');
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
    // debugger;
    //The maximum and the minimum, both are inclusive
    const resultPin = Math.floor(Math.random() * (max - min + 1)) + min;
    displayPin.value = resultPin;

    // When PIN is generated, submitDigit value is empty 
    submitDigit.value = '';

    // NOTIFY messages display is 'none' from notifyMessage()
    notifyMessage();
    submitDisabled();

    // Initial value like reloading when generate PIN
    digitCount = 0;
    tryCount = 3;
    tryLeft.innerText = `${tryCount} try left`;
}

// Function to add digits into submitDigit on submit section
function addDigit(event) {
    // When input numbers exceed 4 digits, stop assign value into the display input
    const digit = event.target.innerText;
    if (digitCount <= 3 && digit !== '<' && digit !== 'C') {
        submitDigit.value += digit;
        digitCount++;

        // If generatePin is not found, alert to generate PIN at first
        alertMessage();
    }
}

// Function to delete one digit from left event
function deleteLeft() {
    console.log(submitDigit.value)
    submitDigit.value = submitDigit.value.slice(0, -1);
    digitCount--;
}

// Function to clear all submitDigit.value in the input box
function clearAll() {
    digitCount = 0;
    submitDigit.value = '';
}

// Function to submit PIN into the input box
function submitPin() {
    isSubmitClicked = true;

    // Show result whether it is RIGHT or WRONG
    notifyMessage();

    // SUBMIT button is active until generate PIN is shown
    submitDisabled();

    // After every SUBMIT click event, digitCount starting from zero (0)
    digitCount = 0;
}

// Function to NOTIFY the message on right or wrong answer and TRY actions
function notifyMessage() {
    // NOTIFY messages display is 'none' at first
    successMessage.style.display = 'none';
    wrongMessage.style.display = 'none';

    // If submitBtn is clicked, process notify message (success or wrong)
    if (isSubmitClicked) {
        if (displayPin.value === submitDigit.value) {
            successMessage.style.display = 'block';
            displayPin.value = '';
            submitDigit.value = '';
            tryLeft.style.display = 'none';
        } else {
            wrongMessage.style.display = 'block';
            --tryCount;
            tryLeft.innerText = `${tryCount} try left`;

            // When 3 times tried, alert message to generate PIN again
            alertMessage();
            submitDigit.value = '';
        }
    }
    // Finishing notifyMessages again assign 'false' to isSubmitClicked
    isSubmitClicked = false;
}

// Function to alert various message on different situations
function alertMessage() {

    // If generatePin is not found, assigning digit/input is not allowed
    if (!displayPin.value) {
        alert('Please generate PIN at first!');
        digitCount = 0;
        return submitDigit.value = '';
    }

    // If anyone click SUBMIT button without input a PIN, alert message
    if (!submitDigit.value) {
        alert('Please press numbers before submitting!')
    }

    // When 3 times trying, alert this and program reset
    if (tryCount <= 0) {
        alert('Oops! You have tried 3 times. Please generate PIN again.');
        displayPin.value = '';
        tryLeft.innerText = '';
        wrongMessage.style.display = 'none';
    }
}