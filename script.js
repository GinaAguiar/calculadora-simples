const display = document.getElementById('display');

function appendToDisplay(input) {
    if (display.value === "Erro") display.value = "";
    
    if (input === ',') {
        const parts = display.value.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes(',')) return;
        if (display.value === "" || /[\+\-\*\/]$/.test(display.value)) {
            display.value += "0";
        }
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    // Convertemos para string para garantir que .slice funcione após cálculos
    let current = display.value.toString();
    if (current === "Erro") {
        display.value = "";
    } else {
        display.value = current.slice(0, -1);
    }
}

function calculate() {
    try {
        let expression = display.value.replace(/,/g, '.');
        
        // Converte X% para (X/100)
        expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

        let result = eval(expression);

        if (result === undefined || !isFinite(result)) {
            display.value = "Erro";
        } else {
            // Limita casas decimais para evitar bugs de precisão
            result = Number(Math.round(result + 'e8') + 'e-8');
            display.value = result.toString().replace(/\./g, ',');
        }
    } catch (error) {
        display.value = "Erro";
    }
}

// Teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) appendToDisplay(key);
    if (['+', '-', '*', '/'].includes(key)) appendToDisplay(key);
    if (key === '%') appendToDisplay('%');
    if (key === ',' || key === '.') appendToDisplay(',');
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    if (key === 'Escape') clearDisplay();
});
