// Variables
let digitCount = 0;

// Selectors
const displayPin = document.querySelector('.display-pin');
const generateBtn = document.querySelector('.generate-btn');
const submitBtn = document.querySelector('.submit-btn');
const digitBtn = document.querySelectorAll('.button');
const displayDigit = document.querySelector('.display-digit');



// Event Listeners
document.addEventListener('DOMContentLoaded', Disabled);
generateBtn.addEventListener('click', generatePin);
submitBtn.addEventListener('click', submitPin);
digitBtn.forEach((digit) => {

    digit.addEventListener("click", addDigit);

    // digit.style.pointerEvent = 'none';
    // console.log(digit.target.innerText)
})

// Functions ==================================
function Disabled() {
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');

    // digitBtn.disabled = true;
    // digitBtn.classList.add('disabled');
}

function generatePin() {
    const min = 1000;
    const max = 9999;

    //The maximum and the minimum both are inclusive
    const resultPin = Math.floor(Math.random() * (max - min + 1)) + min;
    displayPin.value = resultPin;

    submitBtn.disabled = false;
    submitBtn.classList.remove('disabled');

    // digitBtn.disabled = false;
    // digitBtn.classList.remove('disabled');
}

function addDigit(event) {
    // If generatePin is not found, assigning digit/value is not allowed
    if (!displayPin.value) return;

    // When numbers exceeds 4 digit, stop assign value into the display input
    if (digitCount <= 3) {
        const digit = event.target.innerText;
        displayDigit.value += digit;
        digitCount++;
    }
}

function submitPin() {
    if (!displayPin.value) return;

}