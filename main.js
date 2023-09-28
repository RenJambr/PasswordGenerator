//FIRST WAY 

// let passwordEl = document.querySelector('#password');
// let passLengthEl = document.querySelector('#length');
// let buttonGenerate = document.querySelector('#generate');
// let allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
// let selected = [];

// const arraysByCheckboxId = {
//     'uppercase' : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
//     'lowercase' : [],
//     'symbols' : ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '"', '\'', ',', '.', '<', '>', '/', '?'],
//     'numbers' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
// }


// const convertLettersToLower = () => {
//     arraysByCheckboxId['uppercase'].forEach(letter => {
//        letter =  letter.toLowerCase();

//        arraysByCheckboxId['lowercase'].push(letter);
//     })
// }

// convertLettersToLower()


// const generate = () => {
//     selected = [];

//     allCheckBoxes.forEach(box => {
//         if(box.checked == true){
//             selected = selected.concat(arraysByCheckboxId[box.getAttribute('id')])
//         } 
//     })
//     generatePass(selected)
// }

// buttonGenerate.addEventListener('click', generate)

// const generatePass = (selected) => {
//     let len = passLengthEl.value;
//     const shuffled = [...selected].sort(() => 0.5 - Math.random());

//     let pass = shuffled.slice(0, len)
//     passwordEl.value = pass.join("");
// }

//SECOND WAY 
let passwordEl = document.querySelector('#password');
let passLengthEl = document.querySelector('#length');
let buttonGenerate = document.querySelector('#generate');
let uppercaseEl = document.querySelector('#uppercase');
let lowercaseEl = document.querySelector('#lowercase')
let numberEl = document.querySelector('#numbers')
let symbolEl = document.querySelector('#symbols')

const randomFunc = {
    lower : getRandomLower,
    upper : getRandomUpper,
    number : getRandomNum,
    symbol : getRandomSym
}


buttonGenerate.addEventListener('click', () => {
    const len = passLengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNum = numberEl.checked;
    const hasSym = symbolEl.checked;

    passwordEl.value = generatePass(hasUpper, hasLower, hasNum, hasSym, len);
})


function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNum(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSym(){
    const symbols = '!@#$%^&*()_+-=[]{}|:"<>?/';
    return symbols[Math.floor(Math.random() * symbols.length)]
}
const generatePass = (upper, lower, number, symbol, length) => {
    let generatedPass = '';
    let typesCount = upper + lower + number + symbol;
    let typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0){
        return '';
    }
    
    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(item => {
            const funcName = Object.keys(item)[0];
            generatedPass += randomFunc[funcName]()
        });
    }

    let finalPassword = generatedPass.slice(0, length);
    return finalPassword
}