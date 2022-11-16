//Cheat check
window.addEventListener('focus', cheatCatch);
function cheatCatch (){
    console.log('focus')
}
//Topic selection
const TOPICS = {primeNumbersTest:"Prime/composite numbers", squaresTest:"Squares"};
const PASSWORD = "check";
const NUMBER_OF_QUESTIONS = 10;

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
for (let i=0; i<50; i++){
    for (let topic in TOPICS){topicOutput += `<div class="topic" id="${topic}" onClick="${topic}(event)" style="animation-delay:${i*animationDelay}s">${TOPICS[topic]}</div>`};
}
topicField.innerHTML=topicOutput;

//Tests
function primeNumbersTest () {
    renderer([returnButton, testField, resultsCheckForm], [topicField, repeatButton], TOPICS.primeNumbersTest)
    const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    let output = resetVariables();
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
    testField.innerHTML = output;
    repeatButton.addEventListener('click', primeNumbersTest);
}
function squaresTest (){
    renderer([returnButton, testField, resultsCheckForm], [topicField, repeatButton], TOPICS.primeNumbersTest)
    let output = resetVariables();
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
        let exponent = generateRandomNumber(1,3);
        let correctAnswer = number ** exponent;
        correctAnswers.push(correctAnswer);
        output += `<div class="question" id="question${i}">
                    <span class="questionText">${number} &sup${exponent};</span>
                    <input type="text" id="userAnswer${i}">
                    <div id="correctAnswer${i}" class="correctAnswer hidden">${correctAnswer}</div></div>`;
    }
    testField.innerHTML = output;
    console.log(correctAnswers)
    repeatButton.addEventListener('click', squaresTest);
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
    //Get user responses
    for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
        // let userAnswer = document.querySelector(`input[name="variants${i}"]:checked`);
        // userAnswer ? userAnswers.push(userAnswer.value === "true" ? true : false) : userAnswers.push("No answer")
        let userAnswer = document.querySelector(`#userAnswer${i}`).value;
        userAnswers.push(userAnswer === '' ? "No answer" : parseInt(userAnswer))
        console.log(userAnswers)
    }
    //Match with correct answers
    correctAnswers.forEach((correctAnswer, index) => {
        let isCorrect = correctAnswer == userAnswers[index];
        if(isCorrect) results++;

        const questionField = document.querySelector(`#question${index}`);
        const answerField = document.querySelector(`#correctAnswer${index}`);
        answerField.classList.toggle(isCorrect ? "answer-right" : "answer-wrong");
        questionField.classList.toggle(isCorrect ? "question-right" : "question-wrong")
    })
    console.log(results)
    const showAnswerFields = document.querySelectorAll('.correctAnswer');
    renderer(Array.from(showAnswerFields).concat([repeatButton]), [resultsCheckForm], false)
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

function renderer (visibleElements, invisibleElements, header = "Choose your test:"){ //header=false to keep same value
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
    let output = '';
    correctAnswers = [];
    userAnswers = [];
    results = 0;
    return output;
}

