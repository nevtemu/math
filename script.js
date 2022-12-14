//Topic selection
const TOPICS = {'Year 4':{more:{description:"1, 10, 100, 1000 more/less from given number", type:"input"},
                    round:{description:"Round number to nearest", type:"input"},
                    efficient99:{description:"Efficient method to add/subtract 99, 999", type:"input"},
                    sum:{description:"Addition and subtraction of 5-digit numbers", type:"input"},
                    sum100:{description:"Addition and subtraction of multiplies of 100 1000", type:"input"},
                    multi:{description:"Multiply and divide", type:"input"},
                    factFamily:{description:"Inverse addition, subtraction. Fact families", type:"input"},
                    missing:{description:"Missing number", type:"input"},
//split number in few ways
                    compare:{description:"Compare two numbers", type:"compare"},},

                'Year 5':{prime:{description:"Prime and composite numbers", type:"multianswer"},
                    factors:{description:"Split number into prime factors", type:"multiinput"},
                    multi10:{description:"Multiply and divide by 10, 100, 1000", type:"input"},
                    sum:{description:"Addition and subtraction of 5-digit numbers", type:"input"},
                    round:{description:"Round number to nearest", type:"input"},
                    roman:{description:"Roman numbers to 4 000", type:"compare"},
                    compare1M:{description:"Compare two numbers to 1 million", type:"compare"},
                    factFamily:{description:"Inverse addition, subtraction. Fact families", type:"input"},
// split into hundreds, tens
//missing digit in compared numbers
//tables, graphs
// factor trees
//inverse x/
                    negative:{description:"Difference between positive and negative number", type:"input"},
                    area:{description:"Perimeter and area", type:"multiinput"},
                    missing:{description:"Missing number", type:"input"},
                    multi:{description:"Multiply and divide", type:"input"},
                    multi10multiples:{description:"Multiply and divide by multiples of 10, 100, 1000", type:"input"},
                    power:{description:"Square, cube, exponent", type:"input"}}}

const PASSWORD = "math1";
const NUMBER_OF_QUESTIONS = 100;

const topicField = document.querySelector("#topicField");
const headerField = document.querySelector("#headerField");
const resultsCheckForm = document.querySelector("#resultsCheckForm");
const unlockForm = document.querySelector("#unlockForm");
const passwordField = document.querySelector("#passwordField");
const unlockField = document.querySelector("#unlockField");
const returnButton = document.querySelector("#returnButton");
const testField = document.querySelector("#testField");
const repeatButton = document.querySelector("#repeatButton");
const cheatCover = document.querySelector("#cheatCover");

let correctAnswers = [];
let userAnswers = [];
let testType, testYear;
let isAnticheatOn = false;

//Topic render
let topicOutput = '';
const animationDelay = 0.1;
let animationCounter = 0;
for (let year in TOPICS){
    topicOutput += `<div class="year" id="${year}">${year}`
    for (let topic in TOPICS[year]){
        topicOutput += `<div class="topic" id="${topic}" onClick="generateTest(event)" style="animation-delay:${animationCounter*animationDelay}s">${TOPICS[year][topic].description}</div>`;
        animationCounter++};
    topicOutput += `</div>`
}
topicField.innerHTML=topicOutput;


function generateTest (event){
    let source = event.srcElement.id;
    if (source !== 'repeatButton'){
        testType = event.srcElement.id;
        testYear = event.srcElement.parentElement.id;
    }
    renderer([returnButton, testField, resultsCheckForm], [topicField, repeatButton], TOPICS[testYear][testType].description);
    resetVariables();
    let output = generateTestType(testType);
    testField.innerHTML = output;
    repeatButton.addEventListener('click', generateTest); 
    isAnticheatOn = true;
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
        let isCorrect = Array.isArray(correctAnswer) ? correctAnswer.equals(userAnswers[index]) : correctAnswer === userAnswers[index];
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
        case "power": case "round": case "factFamily": case "sum": case "sum100": case "multi": case "multi10": case "multi10multiples": case "negative": case "more": case "efficient99": case "missing":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let userAnswer = document.querySelector(`#userAnswer${i}`).value.trim();
                userAnswers.push(parseInt(userAnswer))
            }
        break;
        case "compare": case "roman": case "compare1M":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let userAnswer = document.querySelector(`#userAnswer${i}`).value.trim();
                userAnswers.push(userAnswer)
            }
        break;
        case "area":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let userAnswerPerimeter = document.querySelector(`#userAnswer${i}Perimeter`).value.trim();
                let userAnswerArea = document.querySelector(`#userAnswer${i}Area`).value.trim();
                userAnswers.push([parseInt(userAnswerPerimeter),parseInt(userAnswerArea)])
            }
        break;
        case "factors":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let userAnswer = document.querySelector(`#userAnswer${i}`).value.split(" ").sort();
                userAnswers.push(userAnswer);
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
    isAnticheatOn = false;
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
                let isPrime = isPrime(number);
                correctAnswers.push(isPrime);
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            <span class="questionText">${number}</span>
                            <input type="radio" name="variants${i}" id="userAnswer${i}" value="true" class="invisible radio-colors"/>
                            <label for="userAnswer${i}">Prime</label>
                            <input type="radio" name="variants${i}" id="userAnswer${i}a" value="false" class="invisible radio-colors"/>
                            <label for="userAnswer${i}a">Composite</label>
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
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            <span class="questionText">${number}${unicode}</span>
                            <input type="text" id="userAnswer${i}" class="answer" maxlength="4" size="4">
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
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <div>
                                    <span class="questionText">${number1}</span>
                                    <input type="text" id="userAnswer${i}" class="answer" maxlength="1" size="1">
                                    <span class="questionText">${number2}</span>
                                </div>
                                <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div>
                            </div>`;
            }
        break;
        case "compare1M":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let numberDigits = [];
                for (let j = 0; j < 6; j++){
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
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <div>
                                    <span class="questionText">${number1}</span>
                                    <input type="text" id="userAnswer${i}" class="answer" maxlength="1" size="1">
                                    <span class="questionText">${number2}</span>
                                </div>
                                <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div>
                            </div>`;
            }
        break;
        case "roman":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number = generateRandomNumber(1,3999);
                let romanNumber = convertToRoman(number);
                let isRoman = Math.random() < 0.5;
                let correctAnswer = isRoman ? number : romanNumber;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <span class="questionText">${isRoman ? romanNumber : number}</span>
                                <input type="text" id="userAnswer${i}" class="answer" maxlength="12" size="12">
                                <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div>
                            </div>`;
            }
        break;
        case "factors":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number;
                do {number = generateRandomNumber(9,100)}
                while(isPrime(number))
                let correctAnswer = getPrimeFactorsOfNumber(number).sort();
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <span class="questionText">${number}</span>
                                <input type="text" id="userAnswer${i}" class="answer" maxlength="12" size="12">
                                <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div>
                            </div>`;
            }
        break;
        case "round":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let division = 10**(i%3+1); //To rotate between 10, 100, 1000
                let number = generateRandomNumber(1111,9999)
                let correctAnswer = Math.round(number/division)*division;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            <span class="questionText">Round ${number} to closest ${division}</span>
                            <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "multi":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                if(Math.random()<0.9){
                    let number1 = generateRandomNumber(0,12);
                    let number2 = generateRandomNumber(1,12);
                    let result = number1*number2;
                    let isMultiplication = Math.random() < 0.5;
                    let correctAnswer = isMultiplication ? result : number1;
                    correctAnswers.push(correctAnswer);
                    output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                    <span class="questionText">${isMultiplication ? number1 : result}${isMultiplication ? "&times;" : "&div;"}${number2}</span>
                                    <input type="text" id="userAnswer${i}" class="answer" maxlength="4" size="4">
                                    <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div>
                                </div>`;
                }
                else {
                    let number1 = generateRandomNumber(2,5);
                    let number2 = generateRandomNumber(2,12 - number1);
                    let number3 = generateRandomNumber(1,12 - number1 - number2);
                    let correctAnswer = number1*number2*number3;
                    correctAnswers.push(correctAnswer);
                    output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                    <span class="questionText">${number1}&times;${number2}&times;${number3}</span>
                                    <input type="text" id="userAnswer${i}" class="answer" maxlength="4" size="4">
                                    <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div>
                                </div>`;
                }
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
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <div>
                                    <span class="questionText">${isMultiplication ? number1 : result}</span>
                                    <span class="questionText">${isMultiplication ? "&times;" : "&div;"}${number2}</span>
                                </div>
                                <input type="text" id="userAnswer${i}" class="answer" maxlength="6" size="6">
                                <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div>
                            </div>`;
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
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <div>
                                    <span class="questionText">${isMultiplication ? number1 : result}</span>
                                    <span class="questionText">${isMultiplication ? "&times;" : "&div;"}${number2}</span>
                                </div>
                                <input type="text" id="userAnswer${i}" class="answer" maxlength="6" size="6">
                                <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div>
                            </div>`;
            }
        break;
        case "efficient99":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1 = generateRandomNumber(1111,9999);
                let number2 = Math.pow(10, generateRandomNumber(2,3)) - 1;
                let isAddition = Math.random() < 0.5;
                let correctAnswer = isAddition ? number1 + number2 : number1 - number2;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            <span class="questionText">${number1} ${isAddition ? "+" : "&#8210;"}${number2}</span>
                            <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
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
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <div>
                                    ${isFirstNumberMissing ? `<input type="text" id="userAnswer${i}" class="answer" maxlength="2" size="2"></input>` : `<span class="questionText">${number1}</span>`}
                                    ${isAddition ? "+" : "&#8210;"}
                                    ${isFirstNumberMissing ? `<span class="questionText">${number2}</span>` : `<input type="text" id="userAnswer${i}" class="answer" maxlength="2" size="2"></input>`}
                                    <span class="questionText">=${result}</span>
                                </div>
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "negative":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let number1 = generateRandomNumber(-50,-5);
                let number2 = generateRandomNumber(5,100);
                let correctAnswer = number2 - number1;
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            <span class="questionText">${number1} and ${number2}</span>
                            <input type="text" id="userAnswer${i}" class="answer" maxlength="3" size="3">
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
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            <span class="questionText">${number2} ${isAddition ? "more than" : "less than"} ${number1}</span>
                            <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
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
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            <span class="questionText rightAlign">${number1}</span>
                            <span class="questionText rightAlign">${isAddition ? "+" : "&#8210;"}${number2}</span>
                            <input type="text" id="userAnswer${i}" class="answer rightAlign" maxlength="5" size="5">
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "sum100":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                if(Math.random()<0.5){
                    console.log("+")
                    let isAddition = Math.random() < 0.5;
                    let multiplier = Math.pow(10, generateRandomNumber(1,3))
                    let number1, number2, correctAnswer;
                    if (isAddition){ //Addition
                        number1 = generateRandomNumber(2,95);
                        number2 = generateRandomNumber(2,99-number1);
                        correctAnswer = (number1 + number2)*multiplier;
                    } else { //Subtraction
                        number1 = generateRandomNumber(9,99);
                        number2 = generateRandomNumber(2,number1-2);
                        correctAnswer = (number1 - number2)*multiplier;
                    }
                    correctAnswers.push(correctAnswer);
                    output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <span class="questionText">${number1*multiplier}${isAddition ? "+" : "&#8210;"}${number2*multiplier}</span>
                                <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
                                <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
                }else{
                    let numberDigits = [];
                    for (let j = 0; j < 4; j++){
                        let digit = generateRandomNumber(j == 0 ? 1 : 0, 9);
                        numberDigits.push(digit);
                    }
                    let index = generateRandomNumber(0,numberDigits.length - 2);
                    let digit1 = generateRandomNumber(5,9);
                    let digit2 = generateRandomNumber(0,digit1-1);
                    numberDigits[index] = digit1;
                    let number1 = joinDigits(numberDigits);
                    numberDigits[index] = digit2;
                    let number2 = joinDigits(numberDigits);
                    correctAnswer = number1 - number2;
                    correctAnswers.push(correctAnswer);
                    output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                                <span class="questionText">${number1}&#8210;${number2}</span>
                                <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
                                <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
                }
            }
        break;
        case "factFamily":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let type = generateRandomNumber(1,4);
                let number1, number2, result, correctAnswer, question, modifier;
                switch(type){
                    case 1://Addition
                        number1 = generateRandomNumber(999,9950);
                        number2 = generateRandomNumber(999,9999-number1);
                        result = number1 + number2;
                        question = `<span class="questionText">${number1}+${number2}=${result}</span>
                                    <div>
                                        <span class="questionText">${result}&#8210;${number2}=</span>
                                        <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
                                    </div>`
                        correctAnswer = result - number2;
                    break;
                    case 2://Subtraction
                        number1 = generateRandomNumber(5000,9950);
                        number2 = generateRandomNumber(999,number1 - 999);
                        result = number1 - number2;
                        question = `<span class="questionText">${number1}&#8210;${number2}=${result}</span>
                                    <div>
                                        <span class="questionText">${result}+${number2}=</span>
                                        <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
                                    </div>`
                        correctAnswer = result + number2;
                    break;
                    case 3://Modified addition
                        if(Math.random() < 0.5){
                            number1 = generateRandomNumber(12,89);
                            number2 = generateRandomNumber(10,99 - number1);
                            modifier = generateRandomNumber(1,9)*Math.pow(10,generateRandomNumber(2,3))
                        }
                        else{
                            number1 = generateRandomNumber(2,8)*100;
                            number2 = generateRandomNumber(1,number1/100 - 1)*100;
                            modifier = generateRandomNumber(1,99);
                        }
                        result = number1 + number2;
                        question = `<span class="questionText">${number1}+${number2}=${result}</span>
                                    <div>
                                        <span class="questionText">${number1+modifier}+${number2}=</span>
                                        <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
                                    </div>`
                        correctAnswer = result + modifier;
                    break;
                    case 4://Modified subtraction
                        if(Math.random() < 0.5){
                            number1 = generateRandomNumber(10,95);
                            number2 = generateRandomNumber(4,number1 - 3);
                            modifier = generateRandomNumber(1,9)*Math.pow(10,generateRandomNumber(2,3))
                        }
                        else{
                            number1 = generateRandomNumber(4,9)*100;
                            number2 = generateRandomNumber(1,number1/100 - 1)*100;
                            modifier = generateRandomNumber(1,99);
                        }
                        result = number1 - number2;
                        console.table(number1,number2,result)
                        question = `<span class="questionText">${number1}&#8210;${number2}=${result}</span>
                                    <div>
                                        <span class="questionText">${number1+modifier}&#8210;${number2+modifier}=</span>
                                        <input type="text" id="userAnswer${i}" class="answer" maxlength="5" size="5">
                                    </div>`
                        correctAnswer = result;
                    break;
                    default:
                        console.error("Error in test type function")
                }
                correctAnswers.push(correctAnswer);
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            ${question}
                            <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
            }
        break;
        case "area":
            for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
                let side1 = generateRandomNumber(1,5);
                let side2 = generateRandomNumber(1,5);
                let correctAnswer = [2*side1 + 2*side2, side1 * side2]
                correctAnswers.push(correctAnswer);
                let rectWidth = side1*30;
                let rectHeight = side2*30;
                let rectX = 40+(150-side1*30)/2;
                let rectY = 40+(150-side2*30)/2;
                output += `<div class="question" id="question${i}" style="animation-delay:${i*animationDelay/4}s">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <rect x="${rectX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}" fill="lightgrey"/>
                                <text x="110" y="${rectY-15}" class="small">${side1}</text>
                                <text x="${rectX-30}" y="120" class="heavy">${side2}</text>
                            </svg>
                            <div class="rightAlign"><label for="perimeter${i}" >Perimeter:</label>
                            <input type="text" id="userAnswer${i}Perimeter" name="perimeter${i}" class="answer " maxlength="2" size="2" style="float:right"></div>
                            <div class="rightAlign"><label for="area${i}" >Area:</label>
                            <input type="text" id="userAnswer${i}Area" name="area${i}" class="answer " maxlength="2" size="2" style="float:right"></div>
                            <div id="correctAnswer${i}" class="correctAnswer hidden">P: ${correctAnswer[0]} A: ${correctAnswer[1]}</div></div>`;
            }
        break;
        default:
            console.error("Error in test type function")
    }
    console.log(correctAnswers)
    return output;
}
function joinDigits (numberDigits){ //converts array of digits [1,2,3,4] into integer 1234
    return [...numberDigits].reverse().reduce((p, c, i) => {return p + c*(10**i)},  0);
}

//Cheat check
window.addEventListener('focus', cheatCatch);
function cheatCatch (){
    if (isAnticheatOn){renderer([cheatCover],[],false)}
}
unlockForm.addEventListener('submit', unlock);
function unlock (event){
    event.preventDefault();
    let userInput = event.srcElement[0].value;
    if (!userInput) return;
    unlockField.value='';
    if(PASSWORD === userInput) renderer([],[cheatCover],false)
}

Array.prototype.equals = function (array) {
    if (!array)
        return false;
    if(array === this)
        return true;
    if (this.length != array.length)
        return false;
    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;   
        }           
    }       
    return true;
}

function convertToRoman (number) {
    let values = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}
    let roman = '';
    for (let i in values) {
        while (number >= values[i]) {
            roman += i;
            number -= values[i];
        }
    }
    return roman;
}

function getPrimeFactorsOfNumber (number) {
    let factors = [];
    let divider = 2;
    while (number >= 2) {
        if (number % divider == 0) {
            factors.push(divider);
            number /= divider;
        } else {
            divider++;
        }
    }
    return factors;
}
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isPrime (number) {
    for(let i = 2, s = Math.sqrt(number); i <= s; i++)
        if(number % i === 0) return false; 
    return number > 1;
}