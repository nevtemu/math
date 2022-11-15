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
const showTestFields = document.querySelectorAll('.showTestFields');

//Topic render
let topicOutput = '';
const animationDelay = 0.1;
for (let i=0; i<50; i++){
    for (let topic in TOPICS){topicOutput += `<div class="topic" id="${topic}" onClick="${topic}(event)" style="animation-delay:${i*animationDelay}s">${TOPICS[topic]}</div>`};
}
topicField.innerHTML=topicOutput;

//Tests
function primeNumbersTest (event) {
    if (event.target.id === 'repeatButton'){
        resultsCheckForm.classList.toggle("invisible");
        repeatButton.classList.toggle("invisible");
    } else {
        changeState(TOPICS.primeNumbersTest);
    }
    const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    let output = '';
    for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
        let number;
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
        let numberIsPrime = primeNumbers.includes(number);
        output += `<div class="question" id="question${i}"><span class="questionText">${number}</span><input type="radio" name="variants${i}" id="userAnswer${i}" class="invisible radio-colors"><label for="userAnswer${i}">Prime</label></input><input type="radio" name="variants${i}" id="userAnswer${i}a" class="invisible radio-colors"><label for="userAnswer${i}a">Composite</label></input><div id="correctAnswer${i}" class="correctAnswer hidden">${numberIsPrime}</div></div>`;
    }
    testField.innerHTML = output;
    //TODO return correctAnswers array
    repeatButton.addEventListener('click', primeNumbersTest);
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
    const showAnswerFields = document.querySelectorAll('.correctAnswer');
    const userAnswersNodes = document.querySelectorAll('[id^="userAnswer"]');
    const userAnswers = [];
    userAnswersNodes.forEach(node => userAnswers.push(node.checked))
    const correctAnswersNodes = document.querySelectorAll('.correctAnswer');
    const correctAnswers = [];
    correctAnswersNodes.forEach(node => correctAnswers.push(node.innerHTML == "true" ? true : false));
    showAnswerFields.forEach(field => field.classList.toggle('hidden'));
    console.log(userAnswers);
    console.log(correctAnswers);

    correctAnswers.forEach((correctAnswer, index) => {
        let isCorrect = correctAnswer == userAnswers[index];
        const questionField = document.querySelector(`#question${index}`);
        const answerField = document.querySelector(`#correctAnswer${index}`);
        answerField.classList.toggle(isCorrect ? "answer-right" : "answer-wrong");
        questionField.classList.toggle(isCorrect ? "question-right" : "question-wrong")
    })
    makeInvisible([resultsCheckForm], true);
    makeInvisible([repeatButton], false);
}
function passwordIncorrect(){
    passwordField.classList.toggle("wrong")
}

//Return to topics
returnButton.addEventListener('click', returnToTopics);

function returnToTopics () {
    makeInvisible([repeatButton, returnButton, testField, resultsCheckForm], true);
    makeInvisible([topicField], false);
}

function changeState(header = "Choose your topic:"){
    showTestFields.forEach(field => field.classList.toggle('invisible'));
    headerField.innerHTML = header;
    testField.innerHTML = '';
}
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeInvisible (elements, isInvisible){
    if (Array.isArray(elements) && typeof isInvisible == "boolean"){
        elements.forEach(element => isInvisible ? element.classList.add("invisible") : element.classList.remove("invisible"))
    }
}

