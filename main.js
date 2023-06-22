function createCalc(){
    //create divs for operators
const operators = document.querySelector('.operators');
const numOfOperators = 7;
const operatorList = ['del', 'AC', '/', '*', '-', '+', '='];
for (let i = 0; i < numOfOperators; i++){
    const div = document.createElement('div');
    div.classList.add('operator-item');
    div.style.width = '100%';
    div.style.height = `${100/numOfOperators}%`;
    div.style.backgroundColor = `rgb(${(i+1)*(255/numOfOperators)},0,0)`;
    div.style.color = 'white'
    div.textContent = operatorList[i];
    operators.appendChild(div);
}

//create divs for numbers
const digitList = [7,8,9,4,5,6,1,2,3,'+/-', 0, '.'];
const digits = document.querySelector('.digits');
const digitsInAColumn = 4;
const digitsInARow = 3;
const numOfDigits = digitsInAColumn*digitsInARow;
for (let i = 0; i < numOfDigits; i++){
    const div = document.createElement('div');
    div.classList.add('digit-item');
    div.style.height = `${100/digitsInAColumn}%`;
    div.style.width = `${100/digitsInARow}%`;
    div.style.backgroundColor = `rgb(0,${(i+1)*(255/numOfDigits)},0)`;
    div.style.color = 'white'
    div.textContent = digitList[i];
    digits.appendChild(div);
}

//create divs for misc functions
const miscList = ['pi', 'e', '1/x', 'y^', '!', 'sqrt', 'log', '^2', '%'];
const miscFunctions = document.querySelector('.misc');
const miscInAColumn = 3;
const miscInARow = 3;
const numOfMisc = miscInAColumn*miscInARow;
for (let i = 0; i <numOfMisc; i++){
    const div = document.createElement('div');
    div.classList.add('digit-item');
    div.style.height = `${100/miscInAColumn}%`;
    div.style.width = `${100/miscInARow}%`;
    div.style.backgroundColor = `rgb(0,0,${(i+1)*(255/numOfMisc)})`;
    div.style.color = 'white'
    div.textContent = miscList[i];
    miscFunctions.appendChild(div);
}
}
createCalc();
var firstNum,secondNum,operator;

//============basic functions==============
function plus(a,b){
    return a+b;
}
function minus(a,b){
    return a-b;
}
function divide(a,b){
    return a/b;
}
function mul(a,b){
    return a*b;
}


//============misc functions==============

function oneOverX(a){
    return 1/a;
}
function power(a,b){
    return a**b;
}
function factorial(a){
    if (a === 0) return 1;
    return a*factorial(a-1);
}
function sqrt(a){
    return Math.sqrt(a);
}
function log(a){
    return Math.log(a);
}
function square(a){
    return a**2;
}
function percentage(a){
    return a/100;
}


//clear and backspace functions
function clearAll(){
    const display = document.querySelector('.display');
    display.textContent = '';
    firstNum = '';
    secondNum = '';
    operator = '';
}

function backspace(){
    const display = document.querySelector('.display');
    var currentDisplay = display.textContent
    display.textContent = currentDisplay.substring(0, currentDisplay.length-1);
}

//============display functions==============
function displayOperator(operator){
    const display = document.querySelector('.display');
    display.textContent += operator;
}
function displayNumber(digit){
    const display = document.querySelector('.display');
    display.textContent += digit;
}
//============calculate functions==============
function calculate(){
    const display = document.querySelector('.display');
    let result;
    firstNum = parseInt(firstNum);
    secondNum = parseInt(secondNum);
    switch(operator){
        case '+':
            result = plus(firstNum,secondNum);
            break;
        case '-':
            result = minus(firstNum,secondNum);
            break;
        case '*':
            result = mul(firstNum,secondNum);
            break;
        case '/':
            result = divide(firstNum,secondNum);
            break;
        case '%':
            result = percentage(firstNum);
            break;
        case '1/x':
            result = oneOverX(firstNum);
            break;
        case 'x^y':
            result = power(firstNum,secondNum);
            break;
        case 'x!':
            result = factorial(firstNum);
            break;
        case 'sqrt':
            result = sqrt(firstNum);
            break;
        case 'log':
            result = log(firstNum);
            break;
        case 'x^2':
            result = square(firstNum);
            break;
    }
    display.textContent = result;
    firstNum = result;
    secondNum = '';
    operator = '';
}


