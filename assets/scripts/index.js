// Mengambil elemen HTML
const expenseForm = document.getElementById("expenseForm");
const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const errorMessage = document.getElementById("errorMessage");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");
const emptyMessage = document.getElementById("emptyMessage");
const clearAllButton = document.getElementById("clearAllButton");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach(function (expense) {
    const listItem = document.createElement("li");
    listItem.classList.add("expense-item");

    const nameText = document.createElement("span");
    nameText.classList.add("expense-name");
    nameText.textContent = expense.name;

    const priceText = document.createElement("span");
    priceText.classList.add("expense-price");
    priceText.textContent = "Rp " + expense.amount.toLocaleString("id-ID");

    listItem.appendChild(nameText);
    listItem.appendChild(priceText);

    expenseList.appendChild(listItem);

    total = total + expense.amount;
  });

  totalExpense.textContent = "Rp " + total.toLocaleString("id-ID");

  clearAllButton.disabled = expenses.length === 0;

  if (expenses.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const amount = amountInput.value.trim();
  const numericAmount = Number(amount);

  if (name === "" || amount === "") {
    errorMessage.textContent = "Lengkapi nama dan nominal pengeluaran.";
    errorMessage.style.display = "block";
    return;
  }

  if (!Number.isSafeInteger(numericAmount) || numericAmount <= 0) {
    errorMessage.textContent =
      "Masukkan nominal berupa angka bulat lebih dari 0.";
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";

  const newExpense = {
    id: Date.now(),
    name: name,
    amount: numericAmount,
  };

  expenses.push(newExpense);

  saveExpenses();
  renderExpenses();
  expenseForm.reset();
  nameInput.focus();
});

clearAllButton.addEventListener("click", function () {
  expenses = [];

  localStorage.removeItem("expenses");

  renderExpenses();
});

renderExpenses();
