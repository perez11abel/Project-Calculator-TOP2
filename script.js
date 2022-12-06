//we need these global variables because we need to manipulate what current operators
// and two values we are working on.
let operator = ""; // /
let previousValue = ""; //56
let currentValue = ""; //

//this EL will load this JS once the content had loaded.
document.addEventListener("DOMContentLoaded", () => {
    //Store all components on HTML in our JS
    let clear = document.querySelector('#clear-btn');
    let equal = document.querySelector('.equal');
    let decimal = document.querySelector('.decimal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');

    let previousScreen = document.querySelector('.previous');
    let currentScreen = document.querySelector('.current');
// "click" is the EVENT, or the 'e' in function(e)...
    numbers.forEach(number => number.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;
    }));

    operators.forEach(op => op.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }));

    clear.addEventListener('click', () => {
        operator = '';
        previousValue = '';
        currentValue = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    });

    equal.addEventListener('click', () => {
        //if cV and pV are NOT empty then run calculate. If empty; dont run calculate.
        if (currentValue != '' && previousValue != '') {
            calculate();
            previousScreen.textContent = '';
            if(previousValue.length <= 5){
                currentScreen.textContent = previousValue;
            } else {
                currentScreen.textContent = previousValue.slice(0, 5) + '...';
            }
        }          
    })

    decimal.addEventListener('click', () => {
        addDecimal();
    })

});


const handleNumber = (num) => {
    if (currentValue.length <= 5) {
    //dsplay number, keep number and display other numbers inputted.
        currentValue += num;
    } 
};

const handleOperator = (op) => {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

const calculate = () => {
    //rn out value is a string so we have to convert it to a number
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === '+') {
        previousValue += currentValue;
    } else if (operator === '-') {
        previousValue -= currentValue;
    } else if (operator === 'x') {
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue;
    }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

const roundNumber = (num) => {
    return Math.round(num * 1000) / 1000;
};

const addDecimal = () => {
    //if cV doesnt have a decimal, then add a decimal if clicked.
    if(!currentValue.includes(".")) {
        currentValue += '.';
    }
    //if cV does have decimal; dont add on decimal, (computer assumes this)
}