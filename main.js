var firstNum= '',secondNum= '',operator = '';
//======fucntion to create calc
function createCalc(){
    //create divs for operators
    const operators = document.querySelector('.operators');
    const numOfOperators = 7;
    const operatorList = ['del', 'AC', '/', '*', '-', '+', '='];
    for (let i = 0; i < numOfOperators; i++){
        const div = document.createElement('div');
        const span = document.createElement('span');
        div.classList.add('operator-item');
        div.style.width = '100%';
        div.style.height = `${100/numOfOperators}%`;
        span.style.width = '100%';
        span.style.height = '100%';
        span.textContent = operatorList[i];
        div.appendChild(span);
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
        const span = document.createElement('span');
        div.classList.add('digit-item');
        div.style.height = `${100/digitsInAColumn}%`;
        div.style.width = `${100/digitsInARow}%`;
        span.style.width = '100%';
        span.style.height = '100%';
        span.textContent = digitList[i];
        div.appendChild(span);
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
        const span = document.createElement('span');
        div.classList.add('misc-item');
        div.style.height = `${100/miscInAColumn}%`;
        div.style.width = `${100/miscInARow}%`;
        span.style.width = '100%';
        span.style.height = '100%';
        span.textContent = miscList[i];
        div.appendChild(span);
        miscFunctions.appendChild(div);
    }
}
//============basic functions==============
function plus(a,b){
    return a+b;
}
function minus(a,b){
    return a-b;
}
function divide(a,b){
    return b > 0 ? a/b: alert('💀');
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
    a = parseInt(a);
    return a === 0 ? 1 : a*factorial(a-1);
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


//========clear and backspace functions=======
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
function displayNumber(digit){
    const display = document.querySelector('.display-bottom');
    display.textContent += digit;
}
function handleOverflow(num,where='bottom',isOverflowing='true'){
    isOverflowing = isOverflowing;
    if (isOverflowing) {
            if (`${num}`.includes('.')){
        maxLength = where === 'bottom' ? 12 : 10;
        var intPartLength = `${num - (num % 1.0)}`.length;   
        return (maxLength - intPartLength) < 0 ? `${(num).toExponential(maxLength/2)}` : num.toFixed(maxLength - intPartLength);
    }
    else {
        maxLength = 14;
        var intPartLength = `${num}`.length;   
        if (intPartLength > maxLength){ 
            return `${(num).toExponential(maxLength/2)}`;
        } else return num
    }
    }
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
        case '^':
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
function isEqual(){
    const displayBottom = document.querySelector('.display-bottom');
    const displayTop =  document.querySelector('.display-top');
    if(firstNum != '' && displayBottom.textContent != '') {
        secondNum = displayBottom.textContent;
        console.log(secondNum);
        firstNum = calculate(firstNum,operator,secondNum);
        displayBottom.textContent = firstNum;
        var isOverflowing = displayBottom.clientWidth < displayBottom.scrollWidth;
        if (isOverflowing){
            displayBottom.textContent = handleOverflow(firstNum, 'bottom');
        }
        displayTop.textContent = '';
        operator = '';
        firstNum = '';
        secondNum = '';
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
function setOperator(oper){
    const displayBottom = document.querySelector('.display-bottom');
    const displayTop = document.querySelector('.display-top');
    if (displayBottom.textContent === '' && displayTop.textContent === ''){
        //pass
    } 
    else if (operator != '') {
        operator = oper;
        displayTop.textContent = handleOverflow(parseFloat(firstNum), 'top') + oper;
    }  else {
        operator = oper;
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

    

}

//creating calc
createCalc();

//=============evenlistners==============

//input buttons
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
//main operators
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

//misc operators
const miscButtons = document.querySelectorAll('.misc-item');
miscButtons.forEach((button) => button.addEventListener('click', () => {
    const displayBottom = document.querySelector('.display-bottom')
    const currentNum = displayBottom.textContent;
    const topExpr = document.querySelector('.display-top').textContent;
    switch(button.textContent){
        case 'pi':
            if (currentNum === ''){
                displayNumber((handleOverflow(Math.PI)));
                
            }
            break;
        case 'e':
            if (currentNum === ''){
                displayNumber((handleOverflow(Math.exp(1))));
                break;
            }
            break;
        case '1/x':
            if (currentNum != ''){
                if (currentNum != 0){
                displayBottom.textContent = '';
                displayNumber(handleOverflow(oneOverX(currentNum)));
                break;
                } else {
                    alert('💀')
                }
            }
        case 'y^':
            if ((currentNum != '' && topExpr === '') ||(currentNum === '' && topExpr != '') || (currentNum != '' && topExpr != '')){
                console.log(topExpr);
                setOperator(('^'));
                break;
            }
        case '!':
            if (currentNum != ''){
                if (currentNum > 0){
                    displayBottom.textContent = '';
                    displayNumber(handleOverflow(factorial(currentNum)));
                    break;
                } 

            }
        case 'sqrt':
            if (currentNum != ''){
                if (currentNum > 0){
                displayBottom.textContent = '';
                displayNumber(handleOverflow(sqrt(currentNum)));
                break;
                }else {alert('💀?');break}
            }
        case 'log':
            if (currentNum != ''){
                if (currentNum > 0){
                displayBottom.textContent = '';
                displayNumber(handleOverflow(log(currentNum)));
                break;}
                else {alert('💀?');break}
            }
        case '^2':
            if (currentNum != ''){
                displayBottom.textContent = '';
                displayNumber(handleOverflow(square(currentNum)));
                break;
            }
        case '%':
            if (currentNum != ''){
                displayBottom.textContent = '';
                displayNumber(handleOverflow(percentage(currentNum)));
                break;
            }
    }
}));