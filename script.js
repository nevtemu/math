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

const showTestFields = document.querySelectorAll('.showTestFields');

//Topic render
let topicOutput = '';
for (let topic in TOPICS){topicOutput += `<div onClick="${topic}()">${TOPICS[topic]}</div>`};
topicField.innerHTML=topicOutput;

//Tests
function primeNumbersTest () {
    changeState(TOPICS.primeNumbersTest);
    const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    let output = '';
    for (let i = 0; i < NUMBER_OF_QUESTIONS; i++){
        let number = generateRandomNumber(2,100);
        let numberIsPrime = primeNumbers.includes(number);
        output += `<div>${number}<input type="radio" name="variants${i}" id="userAnswer${i}">Prime</input><input type="radio" name="variants${i}">Composite</input><div id="correctAnswer${i}" class="correctAnswer invisible">${numberIsPrime}</div></div>`;
    }
    testField.innerHTML += output;
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
    correctAnswersNodes.forEach(node => correctAnswers.push(Boolean(node.innerHTML)));
    showAnswerFields.forEach(field => field.classList.toggle('invisible'));
    console.log(userAnswers);
    console.log(correctAnswers);
    //TODO styles and answer match
}
function passwordIncorrect(){
    //TODO visuals
}

//Return to topics
returnButton.addEventListener('click', returnToTopics);

function returnToTopics () {changeState()}
function changeState(header = "Choose your topic:"){
    showTestFields.forEach(field => field.classList.toggle('invisible'));
    headerField.innerHTML = header;
    testField.innerHTML = '';
}
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}