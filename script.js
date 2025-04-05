const randomQuoteUrl = 'http://api.quotable.io/random';
const textToType = document.getElementById("text-to-type");
const userInput = document.getElementById('user-input');
const startBtn = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");

let timeStart = 0; // ✅ Move outside to track time globally
let interval = null; // ✅ Store interval globally

async function randomQuotes() {
    const response = await fetch(randomQuoteUrl);
    const data = await response.json();
    const quote = data.content;
    getRandomQuotes(quote);
}

function getRandomQuotes(quote) {
    textToType.innerText = '';
    quote.split("").forEach(character => {
        const createSpan = document.createElement("span");
        createSpan.innerText = character;
        textToType.appendChild(createSpan);
    });
}

userInput.addEventListener("input", () => {
    const arrayQuote = document.querySelectorAll("span");
    const userArray = userInput.value.split("");
    let correct = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = userArray[index];
        if (character == null) {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        } else {
            characterSpan.classList.remove("correct");
            characterSpan.classList.add("incorrect");
            correct = false;
        }
    });

    if (correct) {
        stopTimer(); // ✅ Stop timer when user completes the quote
        resultDisplay.innerText = `Completed in ${timeStart} seconds!`;
        userInput.value = "";
        timerDisplay.innerText = `Time: 0s`;
    }
});

startBtn.addEventListener("click", () => {
    randomQuotes();
    startTimer(); // ✅ Start timer on click
});

function startTimer() {
    if (interval) return; // ✅ Prevent multiple intervals
    timeStart = 0;
    timerDisplay.innerText = `Time: 0s`;

    interval = setInterval(() => {
        timeStart++;
        timerDisplay.innerText = `Time: ${timeStart}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null; // ✅ Reset to allow restart
}



// All human wisdom is summed up in two words; wait and hope