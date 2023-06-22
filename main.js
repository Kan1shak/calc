//create divs for operators
const operators = document.querySelector('.operators');
const numOfOperators = 7;
for (let i = 0; i < numOfOperators; i++){
    const div = document.createElement('div');
    div.classList.add('operator-item');
    div.style.width = '100%';
    div.style.height = `${100/numOfOperators}%`;
    div.style.backgroundColor = `rgb(${(i+1)*(255/numOfOperators)},0,0)`;
    div.style.color = 'white'
    div.textContent = i;
    operators.appendChild(div);
}

//create divs for numbers

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
    div.textContent = i;
    digits.appendChild(div);
}

//create divs for misc functions

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
    div.textContent = i;
    miscFunctions.appendChild(div);
}