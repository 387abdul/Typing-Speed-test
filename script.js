import { updateChart, myChart } from './chart.js';
import { transactions } from './transaction.js';

const initialAmount = document.getElementById('initial-amount');   // Current Balance
const expenses = document.getElementById('expenses');    // Expence heading 
const incomes = document.getElementById('incomes');      // Income Heading
const left = document.getElementById('left');            // Left Heading
const expensesButton = document.getElementById('expenses-button');   // Expence button
const incomesButton = document.getElementById('incomes-button');    // Income Button
const chart = document.getElementById('myChart');             // Expence Chart 
const form = document.getElementById("Expence-Form");   // Transaction form
const nameInput = document.querySelector('.chart-placeholder form input[type="text"]');    // Transaction form NameInput
const amountInput = document.querySelector('.chart-placeholder form input[type="number"]');  // Transaction form amountInput 
const addInitialAmount = document.getElementById("addInitial-amount");   // Initial amount Button
const addInitialAmountForm = document.getElementById("addInitial-amount-form");  // Initial amount form
const addInitialAmountInput = document.getElementById("initial-amount-input");  // Initial Input
// by defult
chart.style.display = 'none';
form.style.display = 'none';
addInitialAmountForm.style.display = 'block';

expensesButton.addEventListener('click', () => {    // Expenceses Button Here,  ------
    expensesButton.classList.add('active');         // Expence Chart Actived.  
    incomesButton.classList.remove('active');       // Expnece form UnActive.
    addInitialAmount.classList.remove("active");    // Balance Form UnActive.
    chart.style.display = 'block';                  // Chart of expence. ON
    form.style.display = 'none';                    // Expence Form.    OFF
    addInitialAmountForm.style.display = 'none';    // Balance Form.    OFF
});

incomesButton.addEventListener('click', () => {     // Expence Amount Button Here, ------
    incomesButton.classList.add('active');          // Expence form Active.
    expensesButton.classList.remove('active');      // Expence Chart UnActive.
    addInitialAmount.classList.remove("active");    // Balance Form Unactive.
    chart.style.display = 'none';                   // Chart of Expence.  OFF
    form.style.display = 'block';                   // Expence Form.      ON
    addInitialAmountForm.style.display = 'none';    // Balacne form.      OFF
});

addInitialAmount.addEventListener('click', () => {     // Balance Form Here, -------
    addInitialAmount.classList.add("active");       // Balance Form Active.
    incomesButton.classList.remove("active");       // Expence Form UnActive.
    expensesButton.classList.remove("active");      // Expence Chart UnActive.
    form.style.display = 'none';                    // Expence Form.      OFF
    chart.style.display = 'none';                   // Expence Chart.     OFF
    addInitialAmountForm.style.display = 'block';   // Balance form.      ON
});


//   Expence Form --------->
let totalExpenses = 0; // Store accumulated expenses

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const amount = Number(amountInput.value);
    const currentIncome = Number(incomes.innerText.replace('$', '')) || 0;

    // Check if initial amount exists
    if (currentIncome === 0) {
        alert("Can't add expense! Your balance is empty. Please add initial amount first.");
        nameInput.value = "";
        amountInput.value = "";
        return; // Stop the function here
    }

    if (name && !isNaN(amount)) {
        transactions.push({ name, amount });
        updateChart(myChart);

        totalExpenses += amount;
        expenses.innerText = '$' + totalExpenses;

        let incomeAmount = Number(incomes.innerText.replace('$', '')) || 0;

        let leftAmount = incomeAmount - totalExpenses;
        left.innerText = '$' + (leftAmount <= 0 ? 0 : leftAmount);

        nameInput.value = "";
        amountInput.value = "";
    }
});



// Initial Amount form -------->
addInitialAmountForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentAmount = addInitialAmountInput.value;
    initialAmount.innerText = '$' + currentAmount;
    addInitialAmountInput.value = "";

    incomes.innerText = '$' + currentAmount;
})




