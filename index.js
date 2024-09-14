document.addEventListener("DOMContentLoaded", function() {
   
    let totalIncome = 0;
    let totalExpenses = 0;
    let transactions = [];

    // Function to add income
    function addIncome() {
        const incomeInput = document.getElementById("income-amount");
        const incomeAmount = parseFloat(incomeInput.value);

        if (!isNaN(incomeAmount) && incomeAmount > 0) {
            totalIncome += incomeAmount;
            updateSummary();
            incomeInput.value = ''; 
        } else {
            alert("Please enter a valid income amount.");
        }
    }

    // Function to add expense
    function addExpense(event) {
        event.preventDefault(); 
        const categoryInput = document.getElementById("expense-category");
        const expenseInput = document.getElementById("expense-amount");
        const expenseAmount = parseFloat(expenseInput.value);

        if (!isNaN(expenseAmount) && expenseAmount > 0) {
            const category = categoryInput.value;
            transactions.push({
                category,
                amount: expenseAmount,
                type: "Expense"
            });
            totalExpenses += expenseAmount;
            updateTransactionHistory();
            updateSummary();
            expenseInput.value = ''; 
        } else {
            alert("Please enter a valid expense amount.");
        }
    }

    // Function to update the summary section
    function updateSummary() {
        document.getElementById("total-income").textContent = totalIncome;
        document.getElementById("total-expenses").textContent = totalExpenses;
        document.getElementById("balance").textContent = totalIncome - totalExpenses;
    }

    // Function to update the transaction history
    function updateTransactionHistory() {
        const transactionHistory = document.getElementById("transaction-history");
        transactionHistory.innerHTML = ''; // Clear previous transactions

        transactions.forEach((transaction, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${transaction.category}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.type}</td>
                <td><button class="delete-btn" data-index="${index}" onclick="removeTransaction(${index})">Delete</button></td>
            `;

            transactionHistory.appendChild(tr);
        });
        attachDeleteButtons();
    }

     // Function to attach delete buttons
     function attachDeleteButtons() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                removeTransaction(index);
            });
        });
    }

    // Function to remove a transaction
    function removeTransaction(index) {
        const transaction = transactions[index];

        if (transaction.type === "Expense") {
            totalExpenses -= transaction.amount;
        }
        
        transactions.splice(index, 1);
        updateTransactionHistory();
        updateSummary();
    }

    // Function to clear all transactions and reset the app
    function clearAll() {
        totalIncome = 0;
        totalExpenses = 0;
        transactions = [];
        updateTransactionHistory();
        updateSummary();
    }

    // Attach event listeners
    document.getElementById("expense-form").addEventListener("submit", addExpense);
    document.querySelector(".button-group button").addEventListener("click", addIncome);
    document.querySelector(".clear-button-group button").addEventListener("click", clearAll);
    document.getElementById(".transaction-history button").addEventListener("click", removeTransaction);


    // Initial call to set summary to 0
    updateSummary();
});