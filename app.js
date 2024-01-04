const display = document.getElementById('display');
const calculationHistory = document.getElementById('calculation-history');
let isCalculationCompleted = false;

document.getElementById('calculator').addEventListener('click', function (event) {
    const target = event.target;

    if (target.tagName === 'BUTTON') {
        const value = target.textContent;

        if (target.classList.contains('number-btn')) {
            if (isCalculationCompleted) {
                clearDisplay();
                isCalculationCompleted = false;
            }
            appendToDisplay(value);
        } else if (target.classList.contains('operator-btn')) {
            if (isCalculationCompleted) {
                calculationHistory.textContent = `${display.textContent}${value}`;
                isCalculationCompleted = false;
                display.textContent = calculationHistory.textContent;
            } else {
                appendToDisplay(value);
            }
        } else if (target.classList.contains('parenthesis-btn')) {
            if (isCalculationCompleted) {
                clearDisplay();
                isCalculationCompleted = false;
            }
            appendToDisplay(value);
        } else if (target.id === 'btnEqual') {
            calculate();
            isCalculationCompleted = true;
        } else if (target.id === 'btnClear') {
            clearDisplay();
            isCalculationCompleted = false;
        } else if (target.id === 'btnBackspace') {
            removeLastSymbol();
            isCalculationCompleted = false;
        }
    }
});

function appendToDisplay(value) {
    display.textContent += value;
}

function clearDisplay() {
    display.textContent = '';
    calculationHistory.textContent = '';
}

function calculate() {
    try {
        const result = eval(display.textContent);
        calculationHistory.textContent = `${display.textContent} =`;
        display.textContent = result;
    } catch (error) {
        display.textContent = 'Error';
    }
}

function removeLastSymbol() {
    const currentDisplayValue = display.textContent;
    display.textContent = currentDisplayValue.slice(0, -1);
}
