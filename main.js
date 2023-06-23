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
    div.classList.add('misc-item');
    div.style.height = `${100/miscInAColumn}%`;
    div.style.width = `${100/miscInARow}%`;
    div.style.backgroundColor = `rgb(0,0,${(i+1)*(255/numOfMisc)})`;
    div.style.color = 'white'
    div.textContent = miscList[i];
    miscFunctions.appendChild(div);
}
}
createCalc();
var firstNum= '',secondNum= '',operator = '';

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

function setOperator(oper){
    operator = oper;
    const displayBottom = document.querySelector('.display-bottom');
    const displayTop = document.querySelector('.display-top');
    if (firstNum === ''){
        firstNum = displayBottom.textContent;
        displayBottom.textContent = '';
        displayTop.textContent = firstNum + oper;
        var isOverflowing = displayTop.clientWidth < displayTop.scrollWidth;
    if (isOverflowing){
        displayTop.textContent = handleOverflow(parseFloat(firstNum), 'top') + oper;
    }
    } else if (displayBottom.textContent != '') {
        var prevOper = (displayTop.textContent);
        prevOper = prevOper[prevOper.length -1];
        secondNum = displayBottom.textContent;
        console.log(prevOper);
        firstNum = calculate(firstNum, prevOper, secondNum);
        console.log(firstNum);
        secondNum = '';
        displayBottom.textContent = '';
        displayTop.textContent = firstNum + oper;
    }
    

}

function changeSign(){
    const display = document.querySelector('.display-bottom');
    var currentNum = display.textContent
    currentNum = currentNum.includes('.') ? parseFloat(currentNum):parseInt(currentNum);
    currentNum *= -1
    if (!(display.textContent == '')){
        display.textContent = currentNum;
    }
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
    const displayBottom = document.querySelector('.display-bottom');
    const displayTop = document.querySelector('.display-top');
    displayBottom.textContent = '';
    displayTop.textContent = '';
    firstNum = '';
    secondNum = '';
    operator = '';
}

function backspace(){
    const display = document.querySelector('.display-bottom');
    var displayBottom = display.textContent
    display.textContent = displayBottom.substring(0, displayBottom.length-1);
}

//============display functions==============
function displayOperator(operator){
    const display = document.querySelector('.display-bottom');
    display.textContent += operator;

}
function displayNumber(digit){
    const display = document.querySelector('.display-bottom');
    display.textContent += digit;
}
//============calculate functions==============
function calculate(firstNum, oper, secondNum){
    const display = document.querySelector('.display-bottom');
    let result;
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    switch(oper){
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
    return result;
}

function handleOverflow(num,where){
    maxLength = where === 'bottom' ? 14 : 12;
    var intPartLength = `${num - (num % 1.0)}`.length;   
    console.log('max length' + maxLength); 
    return (maxLength - intPartLength) < 0 ? `${(num).toExponential(maxLength/2)}` : num.toFixed(maxLength - intPartLength);
}

function isEqual(){
    const displayBottom = document.querySelector('.display-bottom');
    const displayTop =  document.querySelector('.display-top');
    if(firstNum != '') {
        secondNum = displayBottom.textContent;
        console.log(secondNum);
    }
    console.log(firstNum,operator,secondNum);
    firstNum = calculate(firstNum,operator,secondNum);
    displayBottom.textContent = firstNum;
    var isOverflowing = displayBottom.clientWidth < displayBottom.scrollWidth;
    if (isOverflowing){
        displayBottom.textContent = handleOverflow(firstNum, 'bottom');
    }
    displayTop.textContent = '';
    firstNum = '';
    secondNum = '';
}

//evenlistners 

const digitButtons = document.querySelectorAll('.digit-item');
digitButtons.forEach((button) => button.addEventListener(('click'), ()=>{
    const currentNum = document.querySelector('.display-bottom').textContent;
    const toBeInput = button.textContent;
    if (!(toBeInput ==='+/-' || toBeInput === '.')){
        displayNumber(toBeInput);
    } else if(toBeInput ==='+/-'){
        changeSign();
    } else if (toBeInput === '.'){
        if(!(currentNum.includes('.'))){
            displayNumber(toBeInput);
        }
    }
}));

const operatorButtons = document.querySelectorAll('.operator-item');
operatorButtons.forEach((button)=> button.addEventListener('click', () =>{
    if (!(button.textContent === 'AC' ||button.textContent === 'del' || button.textContent === '=')){
        setOperator(button.textContent);
    } else{
        switch(button.textContent){
            case 'AC':
                clearAll();
                break;
            case 'del':
                backspace();
                break;
            case '=':
                isEqual()
                break;
        }   
                
    }
}));
