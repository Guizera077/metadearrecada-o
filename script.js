let total = 0;
const meta = 4500;

document.addEventListener("DOMContentLoaded", () => {
    loadSavedValue();
});

function addMoney() {
    let amount = parseFloat(document.getElementById("amount").value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    total += amount;
    if (total > meta) total = meta;

    saveValue();
    document.getElementById("amount").value = "";
}

function removeMoney() {
    let amount = parseFloat(document.getElementById("amount").value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    total -= amount;
    if (total < 0) total = 0;

    saveValue();
    document.getElementById("amount").value = "";
}

function revealAmount() {
    updateThermometer(true);
}

function updateThermometer(isInstant = false) {
    let percentage = (total / meta) * 100;
    let progress = document.querySelector(".progress");
    
    progress.style.transition = isInstant ? "height 2s ease-in-out, background 2s ease-in-out" : "height 5s ease-in-out, background 5s ease-in-out";
    progress.style.height = `${percentage}%`;

    // Mudança de cor progressiva
    if (percentage < 50) {
        progress.style.background = "red";
    } else if (percentage < 100) {
        progress.style.background = "yellow";
    } else {
        progress.style.background = "green";
    }

    // Exibir valor exato
    let valueDisplay = document.querySelector(".value-display");
    valueDisplay.textContent = `R$ ${total.toFixed(2)}`;
}

// Salvar valor no navegador
function saveValue() {
    localStorage.setItem("totalDonations", total);
}

// Carregar valor salvo e animar ao iniciar
function loadSavedValue() {
    let savedValue = localStorage.getItem("totalDonations");
    if (savedValue) {
        total = parseFloat(savedValue);
    }
}