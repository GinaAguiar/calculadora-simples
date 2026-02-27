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

function deleteLast() {
    // Se o display mostrar "Erro", limpamos tudo
    if (display.value === "Erro") {
        display.value = "";
    } else {
        // Remove o último caractere
        display.value = display.value.slice(0, -1);
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
    if (key === 'Backspace') {
        event.preventDefault(); // Evita que o navegador volte a página
        deleteLast();
    }
});

