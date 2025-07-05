const $amount = document.getElementById('amount');
const $interest = document.getElementById('interest');
const $years = document.getElementById('years');
const $monthlyPayment = document.getElementById('monthly-payment');
const $totalPayment = document.getElementById('total-payment');
const $totalInterest = document.getElementById('total-interest');
const $results = document.getElementById('results');
const $loader = document.querySelector('.loader');

// the initial display state could also be achieved with css
document.addEventListener('DOMContentLoaded', hideResultsAndLoader);

document.getElementById('loan-form').addEventListener('submit', e => {
  e.preventDefault();
  showLoaderThenCalculateResults();
});

function hideResultsAndLoader() {
  $results.style.display = 'none';
  $loader.style.display = 'none';
}

function showLoader() {
  $loader.style.display = 'block';
  $results.style.display = 'none';
}

function showResults() {
  $results.style.display = 'block';
  $loader.style.display = 'none';
}

function showLoaderThenCalculateResults() {
  showLoader();
  setTimeout(calculateResults, 2000);
}

function calculateResults() {
  // Calculate formula variables
  const principal = parseFloat($amount.value);
  const calculatedInterest = parseFloat($interest.value) / 100 / 12;
  const calculatedPayments = parseFloat($years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    // Display results
    $monthlyPayment.value = monthly.toFixed(2);
    $totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    $totalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
    showResults();
  } else {
    hideResultsAndLoader();
    showError('Please check your numbers');
  }
}

function showError(message) {
  const errorDiv = createErrorElement(message);
  addErrorToCard(errorDiv);
  removeErrorAfterTimeout();
}

function createErrorElement(message) {
  const div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.appendChild(document.createTextNode(message));
  return div;
}

function addErrorToCard(error) {
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(error, heading);
}

function removeErrorAfterTimeout() {
  setTimeout(removeError, 3000);
}

function removeError() {
  document.querySelector('.alert').remove();
}