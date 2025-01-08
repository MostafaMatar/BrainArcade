const problemElement = document.getElementById('problem');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit-button');
const newGameButton = document.getElementById('new-game-button');
const answerStatus = document.getElementById('status');
const timerDisplay = document.getElementById('timer-display');
let timeLeft = 60;
let correctAnswer = 0;
let score = 0;
let numberOfQuestions = 0;

answerInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});
function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  const correct = userAnswer === correctAnswer;

  if (correct) {
    answerStatus.textContent = 'Answer is correct';
    score++;
  } else {
    answerStatus.textContent = `Incorrect. The answer was ${correctAnswer}`;
  }

  generateProblem();
  answerInput.value = '';
}

function generateProblem() {
  const operations = ['+', '-'];
  const numOperands = Math.floor(Math.random() * 3) + 2; // Generate 2, 3, or 4 operands
  const numbers = [];
  for (let i = 0; i < numOperands; i++) {
    numbers.push(Math.floor(Math.random() * 10) + 1);
  }
  const operationsNeeded = numOperands - 1;
  const operationSequence = [];
  for (let i = 0; i < operationsNeeded; i++) {
    operationSequence.push(operations[Math.floor(Math.random() * operations.length)]);
  }

  let problem = `${numbers[0]}`;
  for (let i = 1; i < numOperands; i++) {
    problem += ` ${operationSequence[i - 1]} ${numbers[i]}`;
  }
  problemElement.textContent = problem;
  numberOfQuestions++;

  // Calculate the correct answer
  correctAnswer = numbers[0];
  for (let i = 1; i < numOperands; i++) {
    if (operationSequence[i - 1] === '+') {
      correctAnswer += numbers[i];
    } else if (operationSequence[i - 1] === '-') {
      correctAnswer -= numbers[i];
    }
  }
}

submitButton.addEventListener('click', () => {
  checkAnswer();
});

newGameButton.addEventListener('click', () => {
  window.location.reload();
});

let intervalId = setInterval(function () {
  timeLeft--;
  timerDisplay.textContent = 'Time: '+timeLeft;
  if (timeLeft == 0) {
    clearInterval(intervalId);
    document.getElementById('results').innerHTML = `
      <h2>Game Over!</h2>
      <p>Your final score is: ${score}/${numberOfQuestions}</p>
      <p>Your accuracy is: ${((score / numberOfQuestions) * 100).toFixed(2)}%</p>
    `;
    document.getElementById('game').style.display = 'none';
  }
}, 1000);

generateProblem();
