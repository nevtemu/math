//Cheat check
window.addEventListener('focus', cheatCatch);
function cheatCatch (){
    console.log('focus')
}
//Topic selection
const TOPICS = {prime:{description:"Prime and composite numbers", type:"multianswer"},
                compare:{description:"Compare two numbers", type:"compare"},
                round:{description:"Round number to nearest", type:"input"},
                sum:{description:"Addition and multiplication of 5-digit numbers", type:"input"},
                multi:{description:"Multiply and divide", type:"input"},
                multi10:{description:"Multiply and divide by 10, 100, 1000", type:"input"},
                multi10multiples:{description:"Multiply and divide by multiples of 10, 100, 1000", type:"input"},
                negative:{description:"Difference between positive and negative number", type:"input"},
                more:{description:"1, 10, 100, 1000 more/less from given number", type:"input"},
                efficient99:{description:"Efficient method to add/subtract 99, 999", type:"input"},
                missing:{description:"Missing number", type:"input"},
                power:{description:"Square, cube, exponent", type:"input"}};
const PASSWORD = "check";
const NUMBER_OF_QUESTIONS = 100;

const topicField = document.querySelector("#topicField");
const headerField = document.querySelector("#headerField");
const resultsCheckForm = document.querySelector("#resultsCheckForm");
const passwordField = document.querySelector("#passwordField");
const returnButton = document.querySelector("#returnButton");
const testField = document.querySelector("#testField");
const repeatButton = document.querySelector("#repeatButton");

let correctAnswers = [];
let userAnswers = [];
let testType;

//Topic render
let topicOutput = '';
const animationDelay = 0.1;
let animationCounter = 0;
for (let topic in TOPICS){
    topicOutput += `<div class="topic" id="${topic}" onClick="generateTest(event)" style="animation-delay:${animationCounter*animationDelay}s">${TOPICS[topic].description}</div>`;
    animationCounter++};
topicField.innerHTML=topicOutput;


function generateTest (event){
    let source = event.srcElement.id;
    if (source !== 'repeatButton'){testType = event.srcElement.id;}
    renderer([returnButton, testField, resultsCheckForm], [topicField, repeatButton], TOPICS[testType].description);
    resetVariables();
    let output = generateTestType(testType);
    console.log(correctAnswers)
    testField.innerHTML = output;
    repeatButton.addEventListener('click', generateTest); 
}

//Checking results
resultsCheckForm.addEventListener('submit', checkResults);
function checkResults (event) {
    event.preventDefault();
    let userInput = event.srcElement[0].value;
    if (!userInput) return;
    passwordField.value='';
    PASSWORD === userInput ? showAnswers() : passwordIncorrect();
}
function showAnswers(){
    getUserAnswers();
    correctAnswers.forEach((correctAnswer, index) => {
        let isCorrect = correctAnswer == userAnswers[index];
        if(isCorrect) results++;
        const questionField = document.querySelector(`#question${index}`);
        const answerField = document.querySelector(`#correctAnswer${index}`);
        answerField.classList.toggle(isCorrect ? "answer-right" : "answer-wrong");
        questionField.classList.toggle(isCorrect ? "question-right" : "question-wrong")
    })
    const showAnswerFields = document.querySelectorAll('.correctAnswer');
    renderer(Array.from(showAnswerFields).concat([repeatButton]), [resultsCheckForm], false)
}
function getUserAnswers (){
    switch(testType){
        case "prime":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let userAnswer = document.querySelector(`input[name="variants${i}"]:checked`);
                userAnswer ? userAnswers.push(userAnswer.value === "true" ? true : false) : userAnswers.push("No answer");
            }
        break;
        case "power": case "round": case "sum": case "multi": case "multi10": case "multi10multiples": case "negative": case "more": case "efficient99": case "missing":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let userAnswer = document.querySelector(`#userAnswer${i}`).value;
                userAnswers.push(parseInt(userAnswer))
            }
        break;
        case "compare":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let userAnswer = document.querySelector(`#userAnswer${i}`).value;
                userAnswers.push(userAnswer)
            }
        break;
        default:
            console.error("Error in getUserAnswers function")
    }
    console.log(userAnswers)
}
function passwordIncorrect(){
    passwordField.classList.toggle("wrong")
}

//Return to topics
returnButton.addEventListener('click', returnToTopics);
function returnToTopics () {
    renderer([topicField],[repeatButton, returnButton, testField, resultsCheckForm]);
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderer (visibleElements, invisibleElements, header = "Choose your topic:"){ //header=false to keep same value
    if (Array.isArray(visibleElements) && Array.isArray(invisibleElements)){
        visibleElements.forEach(element => element.classList.remove("invisible", "hidden"));
        invisibleElements.forEach(element => element.classList.add("invisible"));
        if (header !== false) headerField.innerHTML = header;
    }
    else {
        console.alert("renderer function error")
    }
}

function resetVariables (){
    correctAnswers = [];
    userAnswers = [];
    results = 0;
}

function generateTestType (topic){
    let output = '';
    switch(topic){
        case "prime":
            const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number;
                //Make numbers unique (not repeated if possible)
                let usedNumbers = [];
                if (NUMBER_OF_QUESTIONS < 99){
                    usedNumbers = [];
                    do {number = generateRandomNumber(2,100);}
                    while (usedNumbers.includes(number))
                    usedNumbers.push(number)
                }
                else {
                    number = generateRandomNumber(2,100);
                }
                let isPrime = primeNumbers.includes(number);
                correctAnswers.push(isPrime);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${number}</span>
                            <input type="radio" name="variants${i}" id="userAnswer${i}" value="true" class="invisible radio-colors">
                            <label for="userAnswer${i}">Prime</label>
                            </input><input type="radio" name="variants${i}" id="userAnswer${i}a" value="false" class="invisible radio-colors">
                            <label for="userAnswer${i}a">Composite</label></input>
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${isPrime ? "Prime" : "Composite"}</div></div>`;
            }
        break;
        case "power":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number;
                //Make numbers unique (not repeated if possible)
                let usedNumbers = [];
                if (NUMBER_OF_QUESTIONS < 16){
                    usedNumbers = [];
                    do {number = generateRandomNumber(0,15);}
                    while (usedNumbers.includes(number))
                    usedNumbers.push(number)
                }
                else {
                    number = generateRandomNumber(0,15);
                }
                let exponent = generateRandomNumber(1, 7-number < 2 ? 2 : 7-number);
                let correctAnswer = number ** exponent;
                correctAnswers.push(correctAnswer);
                let unicode = exponent <= 3 ? `&sup${exponent};` : `&#x207${exponent};`
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${number}${unicode}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "compare":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let numberDigits = [];
                for (let j = 0; j < 4; j++){
                    let digit = generateRandomNumber(j == 0 ? 1 : 0, 9);
                    numberDigits.push(digit);
                }
                let number1 = joinDigits(numberDigits);
                for (let k = 0; k < 2; k++){
                    numberDigits[generateRandomNumber(0,numberDigits.length - 1)] = generateRandomNumber(1,9);
                }
                let number2 = joinDigits(numberDigits);
                let correctAnswer = number1 > number2 ? ">" : number1 < number2 ? "<" : "=";
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${number1}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <span class="questionText">${number2}</span>
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "round":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let division = 10**(i%3+1); //To rotate between 10, 100, 1000
                let number = generateRandomNumber(1111,9999)
                let correctAnswer = Math.round(number/division)*division;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">Round ${number} to closest ${division}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "multi":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1 = generateRandomNumber(0,12);
                let number2 = generateRandomNumber(1,12);
                let result = number1*number2;
                let isMultiplication = Math.random() < 0.5;
                let correctAnswer = isMultiplication ? result : number1;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${isMultiplication ? number1 : result}</span>
                            <span class="questionText underline">${isMultiplication ? "&times;" : "&div;"}${number2}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "multi10":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let numberLength = generateRandomNumber(0,3);
                let number1 = generateRandomNumber(Math.pow(10,numberLength),Math.pow(10, numberLength+1));
                let number2 = Math.pow(10, 4 - numberLength);
                let result = number1*number2;
                let isMultiplication = Math.random() < 0.5;
                let correctAnswer = isMultiplication ? result : number1;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${isMultiplication ? number1 : result}</span>
                            <span class="questionText underline">${isMultiplication ? "&times;" : "&div;"}${number2}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "multi10multiples":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1 = generateRandomNumber(1,11);
                let number2 = generateRandomNumber(1,12) * Math.pow(10, generateRandomNumber(2,4));
                let isMultiplication = Math.random() < 0.5;
                let result = number1*number2;
                let correctAnswer = isMultiplication ? result : number1;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${isMultiplication ? number1 : result}</span>
                            <span class="questionText underline">${isMultiplication ? "&times;" : "&div;"}${number2}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "efficient99":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1 = generateRandomNumber(1111,9999);
                let number2 = Math.pow(10, generateRandomNumber(2,3)) - 1;
                let isAddition = Math.random() < 0.5;
                let correctAnswer = isAddition ? number1 + number2 : number1 - number2;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${number1}</span>
                            <span class="questionText underline">${isAddition ? "+" : "&#8210;"}${number2}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "missing":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1 = generateRandomNumber(11,88);
                let number2 = generateRandomNumber(11,number1);
                let isAddition = Math.random() < 0.5;
                let result = isAddition ? number1 + number2 : number1 - number2;
                let isFirstNumberMissing = Math.random() < 0.5;
                let correctAnswer = isFirstNumberMissing ? number1 : number2;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            ${isFirstNumberMissing ? `<input type="text" id="userAnswer${i}" class="question"></input>` : `<span class="questionText">${number1}</span>`}
                            ${isAddition ? "+" : "&#8210;"}
                            ${isFirstNumberMissing ? `<span class="questionText">${number2}</span>` : `<input type="text" id="userAnswer${i}" class="question"></input>`}
                            <span class="questionText">=${result}</span>
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "negative":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1 = generateRandomNumber(-50,-5);
                let number2 = generateRandomNumber(5,100);
                let correctAnswer = number2 - number1;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${number1} and ${number2}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "more":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1 = generateRandomNumber(1111,9999);
                let number2 =  Math.pow(10, generateRandomNumber(0,3));
                let isAddition = Math.random() < 0.5;
                let correctAnswer = isAddition ? number1 + number2 : number1 - number2;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${number2} ${isAddition ? "more than" : "less than"}</span>
                            <span class="questionText">${number1}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "sum":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1Digits = [], number2Digits = [], number1, number2;
                let isAddition = Math.random() < 0.5;

                if (isAddition){ //Addition
                    for (let j = 0; j < 5; j++){
                        let digit = j == 0 ? generateRandomNumber(1, 4) : generateRandomNumber(0, 9);
                        number1Digits.push(digit);
                    }
                    number1 = joinDigits(number1Digits);
                    for (let j = 0; j < 5; j++){
                        let digit = j <= 1 ? generateRandomNumber(1, 4) : generateRandomNumber(9 - number1Digits[j], 9);
                        number2Digits.push(digit);
                    }
                    number2 = joinDigits(number2Digits);

                } else { //Subtraction
                    for (let j = 0; j < 5; j++){
                        let digit = j == 0 ? generateRandomNumber(6, 9) : generateRandomNumber(0, 8);
                        number1Digits.push(digit);
                    }
                    number1 = joinDigits(number1Digits);
                    for (let j = 0; j < 5; j++){
                        let digit = j <= 1 ? generateRandomNumber(1, 5) : generateRandomNumber(number1Digits[j] + 1, 9);
                        number2Digits.push(digit);
                    }
                    number2 = joinDigits(number2Digits);
                }
                let correctAnswer = isAddition ? number1 + number2 : number1 - number2;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}">
                            <span class="questionText">${number1}</span>
                            <span class="questionText underline">${isAddition ? "+" : "&#8210;"}${number2}</span>
                            <input type="text" id="userAnswer${i}" class="question">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        default:
            console.error("Error in test type function")
    }
    return output;
}
function joinDigits (numberDigits){ //converts array of digits [1,2,3,4] into integer 1234
    return [...numberDigits].reverse().reduce((p, c, i) => {return p + c*(10**i)},  0);
}