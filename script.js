const display = document.getElementById('display');

function appendToDisplay(input) {
    if (display.value === "Erro") display.value = "";
    
    // Impede colocar duas vírgulas seguidas ou no mesmo número
    if (input === ',') {
        const parts = display.value.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes(',')) return;
        if (display.value === "" || /[\+\-\*\/]$/.test(display.value)) {
            display.value += "0"; // Transforma "," em "0,"
        }
    }

    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    if (display.value === "Erro") {
        display.value = "";
    } else {
        display.value = display.value.toString().slice(0, -1);
    }
}

function calculate() {
    try {
        let expression = display.value;

        // 1. Troca a vírgula por ponto para o cálculo
        expression = expression.replace(/,/g, '.');

        // 2. Trata a porcentagem (Ex: 50% vira 50/100)
        expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

        // 3. Calcula
        let result = eval(expression);

        if (result === undefined || !isFinite(result)) {
            display.value = "Erro";
        } else {
            // Arredonda para evitar dízimas gigantes e volta para vírgula
            result = parseFloat(result.toFixed(8));
            display.value = result.toString().replace(/\./g, ',');
        }
    } catch (error) {
        display.value = "Erro";
    }
}

// Suporte ao teclado
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
    
    if (key === 'Escape') {
        clearDisplay();
    }
});
