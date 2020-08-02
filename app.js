// Selectors
const displayPin = document.querySelector('.display-pin');
const generateBtn = document.querySelector('.generate-btn');



// Event Listeners
generateBtn.addEventListener('click', generatePin);


// Functions ==================================
function generatePin() {
    const min = 1000;
    const max = 9999;

    //The maximum and the minimum both are inclusive
    const resultPin = Math.floor(Math.random() * (max - min + 1)) + min;
    displayPin.value = resultPin;
}