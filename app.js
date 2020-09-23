// Listen for Submit

document.querySelector("#loan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Hide results
  document.querySelector("#results").style.display = "none";

  // Show loader
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 500);
});

function calculateResults(e) {
  console.log("Calculating...");

  // UI Variables
  const amount = document.querySelector("#amount");
  const downPayment = document.querySelector("#down-payment");
  const tradeIn = document.querySelector("#trade-in");
  const interest = document.querySelector("#interest");
  const tax = document.querySelector("#tax");
  const term = document.querySelector("#term");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalFinanced = document.querySelector("#total-financed");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal =
    (parseFloat(amount.value) -
      parseFloat(downPayment.value || 0) -
      parseFloat(tradeIn.value || 0)) *
    (1 + parseFloat(tax.value / 100));
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(term.value);

  // Compute Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalFinanced.value = principal.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show results
    document.querySelector("#results").style.display = "block";

    // Hide spinner
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your numbers.");
  }
}

// Show Error
function showError(error) {
  // Hide Loader
  document.querySelector("#loading").style.display = "none";

  // Hide Results
  document.querySelector("#results").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.append(document.createTextNode(error));

  // Inset error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
