const btnTip = document.querySelectorAll(".tip");
const customTip = document.querySelector("#tipSelect");

let tipAmountResult = document.querySelector(".tip-total");
let totalAmountResult = document.querySelector(".total-total");
const resetBtn = document.querySelector(".reset-btn");

let selectedTip = 0;

// Handle tip button clicks
btnTip.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    selectedTip = parseFloat(e.target.value); // Parse the value to ensure it's a number
    btnTip.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");
    calculateTip();
  });
});

// Handle custom tip input changes
customTip.addEventListener("input", () => {
  btnTip.forEach((button) => button.classList.remove("active"));
  selectedTip = parseFloat(customTip.value) || 0;
  calculateTip();
});

// Calculate tip and update results
function calculateTip() {
  const bill = parseFloat(document.querySelector("#bill").value);
  const numOfPeople = parseInt(document.querySelector("#numOfPeople").value);

  // Validate inputs
  if (isNaN(bill) || bill <= 0) {
    alert("Please enter a valid Bill amount. (It can't be 0 or undefined)");
    return;
  }

  if (isNaN(numOfPeople) || numOfPeople <= 0) {
    alert(
      "Please enter a valid amount of People. (It must be at least 1 person)"
    );
    return;
  }

  // Calculate the tip and total amounts
  const tipAmount = (bill * selectedTip) / 100;
  const totalAmount = bill + tipAmount;
  const perPersonAmount = totalAmount / numOfPeople;

  // Update the result display
  totalAmountResult.textContent = `$${perPersonAmount.toFixed(2)}`;
  tipAmountResult.textContent = `$${tipAmount.toFixed(2)}`;

  // Add active class to the reset button after calculation
  resetBtn.classList.add("active");
}

// Event listener for the "Enter" key
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    calculateTip();
  }
});

// Reset functionality
resetBtn.addEventListener("click", () => {
  // Reset input fields
  document.querySelector("#bill").value = "";
  document.querySelector("#numOfPeople").value = "1";
  customTip.value = "";

  // Reset results to $0.00
  tipAmountResult.textContent = `$0.00`;
  totalAmountResult.textContent = `$0.00`;

  // Remove active class from all buttons and reset selected tip
  btnTip.forEach((button) => button.classList.remove("active"));
  selectedTip = 0;

  // Remove the active class from the reset button
  resetBtn.classList.remove("active");
});
