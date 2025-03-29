import {transactions} from './transaction.js';

const ctx = document.getElementById("myChart").getContext('2d');

export const myChart = new Chart(ctx, {
  // type: 'doughnut',
  type: 'bar', 
  data: {
    labels: transactions.map(transaction => transaction.name),
    datasets: [{
      label: 'Transaction',
      data: transactions.map(transaction => transaction.amount), 
      backgroundColor: 'rgba(255, 191, 0, 1)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});


export function updateChart() {
  myChart.data.labels = transactions.map((transaction) => transaction.name);
  myChart.data.datasets[0].data = transactions.map((transaction) => transaction.amount);
  myChart.update();
}