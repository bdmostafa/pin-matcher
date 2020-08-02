// Selectors
const displayPin = document.querySelector('.display-pin');
const generateBtn = document.querySelector('.generate-btn');
const submitBtn = document.querySelector('.submit-btn');



// Event Listeners
document.addEventListener('DOMContentLoaded', submitDisabled);
generateBtn.addEventListener('click', generatePin);
submitBtn.addEventListener('click', submitPin);


// Functions ==================================
function submitDisabled() {
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
}

function generatePin() {
    const min = 1000;
    const max = 9999;

    //The maximum and the minimum both are inclusive
    const resultPin = Math.floor(Math.random() * (max - min + 1)) + min;
    displayPin.value = resultPin;
    submitBtn.disabled = false;
    submitBtn.classList.remove('disabled');
}

function submitPin() {
    if (!displayPin.value) return;

}