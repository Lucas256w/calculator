let displayValue = '';
let newDisplayValue = '';
let secondNum = false;
let currentOperator
let num1;
let num2;

function adding(a, b) {
    displayValue = +(+a + +b).toFixed(4)
    toDisplay(displayValue)

};

function subtracting(a, b) {
    displayValue = +(+a - +b).toFixed(4)
    toDisplay(displayValue)
};

function multiplying(a, b) {
    displayValue = +(+a * +b).toFixed(4)
    toDisplay(displayValue)
};

function dividing(a, b) {
    displayValue = +(+a / +b).toFixed(4)
    toDisplay(displayValue)
};

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            adding(a, b);
            break;
        case "-":
            subtracting(a, b);
            break;
        case "×":
            multiplying(a, b);
            break;
        case "÷":
            dividing(a, b);
            break;
    }
    secondNum = false
    displayValue = displayValue.toString();
}


function toDisplay(value) {
    currentScreen.textContent = value;
}

function toLastDisplay(value) {
    lastScreen.textContent = value;
}

const nums = document.querySelectorAll('.num');
const currentScreen = document.querySelector('#currentscreen');
const lastScreen = document.querySelector('#lastscreen');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const equal = document.querySelector('#equal');
const del = document.querySelector('#delete')

// divide.addEventListener('click', () => {
//     console.log(divide.textContent);
// })
for (let num of nums) {
    num.addEventListener('click', () => {
        displayValue += num.textContent
        toDisplay(displayValue);
    });
}

const operators = [add, subtract, multiply, divide];

for (let operator of operators) {
    operator.addEventListener('click', () => {
        if(!secondNum) {
            num1 = displayValue;
            currentOperator = operator.textContent;
            newDisplayValue = displayValue + currentOperator;
            toLastDisplay(newDisplayValue);
            displayValue = ''
            secondNum = true;
        }
        else if(currentOperator != operator.textContent) {
            newDisplayValue = newDisplayValue.slice(0,newDisplayValue.length-1) + operator.textContent;
            currentOperator = operator.textContent;
            toLastDisplay(newDisplayValue)
        }
    
    })
}

equal.addEventListener('click', () => {
    if(secondNum) {
        num2 = displayValue;
        toLastDisplay(num1+currentOperator+num2+"=")
        operate(currentOperator ,num1, num2);
    }
})

del.addEventListener('click', () => {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    toDisplay(displayValue)
})
