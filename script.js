const display = document.getElementById('display');
function appendToDisplay(input) {
    if (display.value === "Erro") display.value = "";
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        // Substitui a vírgula visual por ponto para o JavaScript calcular
        let fixedExpression = display.value.replace(/,/g, '.');
        
        const result = eval(fixedExpression);

        if (!isFinite(result)) {
            display.value = "Erro";
        } else {
            // Converte o ponto de volta para vírgula no resultado
            display.value = result.toString().replace(/\./g, ',');
        }
    } catch (error) {
        display.value = "Erro";
    }
}

// Suporte ao teclado físico
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) appendToDisplay(key);
    if (['+', '-', '*', '/'].includes(key)) appendToDisplay(key);
    if (key === ',' || key === '.') appendToDisplay(',');
    if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Evita comportamentos inesperados do Enter
        calculate();
    }
    if (key === 'Escape') clearDisplay();
    if (key === 'Backspace') deleteLast();
});
