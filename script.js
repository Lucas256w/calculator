let displayValue = '';
let newDisplayValue = '';
let secondNum = false;
let currentOperator = null;
let num1 = null;
let num2 = null;

function adding(a, b) {
    displayValue = +(+a + +b).toFixed(4)

};

function subtracting(a, b) {
    displayValue = +(+a - +b).toFixed(4)
};

function multiplying(a, b) {
    displayValue = +(+a * +b).toFixed(4)
};

function dividing(a, b) {
    displayValue = +(+a / +b).toFixed(4)
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
    displayValue = displayValue.toString();
}


function toDisplay(value) {
    currentScreen.textContent = value;
}

function toLastDisplay(value) {
    lastScreen.textContent = value;
}

function cleared() {
    displayValue = '';
    newDisplayValue = '';
    secondNum = false;
    currentOperator = null;
    num1 = null;
    num2 = null;
    toDisplay(0);
    toLastDisplay('')
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function error(){
    toLastDisplay('')
    toDisplay('Error');
    await delay(250);
    cleared();
    await delay(250);
    toDisplay('Error')
    await delay(250);
    cleared();
};

const nums = document.querySelectorAll('.num');
const currentScreen = document.querySelector('#currentscreen');
const lastScreen = document.querySelector('#lastscreen');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const equal = document.querySelector('#equal');
const del = document.querySelector('#delete')
const clear = document.querySelector('#clear');


for (let num of nums) {
    num.addEventListener('click', () => {
        if(num.textContent =='.') {
            if(displayValue == '.' || displayValue == '' || displayValue == '0'){
                if(!secondNum){
                    displayValue = '0.'
                    num1 = displayValue
                    toDisplay(displayValue)
                }
                else{
                    displayValue = '0.'
                    num2 = displayValue
                    toDisplay(displayValue)
                }
            }
            if (displayValue.includes(".")) {
                return
            }
        }
        if((num.textContent == '0' && num1 == null) || displayValue == '0') {
            displayValue = '';
        }
        if(!secondNum && num2 ==null) {
            displayValue += num.textContent;
            num1 = displayValue;
            toDisplay(displayValue);
        }
        else {
            displayValue += num.textContent;
            num2 = displayValue;
            toDisplay(displayValue);
        }
    });
}

const operators = [add, subtract, multiply, divide];

for (let operator of operators) {
    operator.addEventListener('click', () => {
        if(!secondNum && displayValue == ''){
            displayValue = '0'
            num1 = '0';
            currentOperator = operator.textContent;
            newDisplayValue = displayValue + currentOperator;
            toLastDisplay(newDisplayValue);
            displayValue = ''
            secondNum = true;
        }
        else if(!secondNum) {
            num1 = displayValue;
            currentOperator = operator.textContent;
            newDisplayValue = displayValue + currentOperator;
            toLastDisplay(newDisplayValue);
            displayValue = ''
            secondNum = true;
        }
        else if(currentOperator != operator.textContent && num2 == null) {
            newDisplayValue = newDisplayValue.slice(0,newDisplayValue.length-1) + operator.textContent;
            currentOperator = operator.textContent;
            toLastDisplay(newDisplayValue)
        }
        else if(num2 != null) {
            operate(currentOperator ,num1, num2);
            num1 = displayValue
            currentOperator = operator.textContent;
            newDisplayValue = displayValue + currentOperator;
            toLastDisplay(newDisplayValue)
            displayValue = ''
            num2 = null;

        }
        
    
    })
}

equal.addEventListener('click', () => {
    if(secondNum && num2 != null) {
        // num2 = displayValue;
        // if((num2 == '0' || num2 == '0.0'|| num2 == '0.' || num2 == '.0')&& currentOperator == '÷'){
        //         error();
        // }
        // else{
            toLastDisplay(num1+currentOperator+num2+"=")
            operate(currentOperator ,num1, num2);
            if (displayValue == 'Infinity'){
                error()
            }
            else{
                toDisplay(displayValue)
                secondNum = false
            }
        // }
    }
})

del.addEventListener('click', () => {
    if (secondNum) {
        displayValue = displayValue.substring(0, displayValue.length - 1);
        num2 = displayValue;
        toDisplay(displayValue)
    }
    else {
        displayValue = displayValue.substring(0, displayValue.length - 1);
        num1 = displayValue;
        toDisplay(displayValue)
    }
})

clear.addEventListener('click', () => {
    cleared();
})
