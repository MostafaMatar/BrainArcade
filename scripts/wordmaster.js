const scrambledWordElement = document.getElementById('scrambled-word');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const skipButton = document.getElementById('skip');
const feedbackElement = document.getElementById('feedback');

guessInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    checkGuess(event.target.value);
    event.target.value = '';
  }
});

let words = [
  "apple", "banana", "orange", "grapefruit", "watermelon", "strawberry", "blueberry", "raspberry", "mango", "pineapple", "carrot", "broccoli", "spinach", "tomato", "cucumber", "onion", "potato", "garlic", "ginger", "lemon", "lime", "avocado", "pear", "peach", "plum", "apricot", "kiwi", "grape", "fig", "melon", "papaya", "coconut", "banana", "mango", "pineapple", "strawberry", "blueberry", "raspberry", "cherry", "plum", "apple", "orange", "grapefruit", "watermelon", "kiwi", "pear", "peach", "apricot", "fig", "date", "pomegranate", "london", "paris", "tokyo", "rome", "madrid", "berlin", "moscow", "cairo", "sydney", "toronto", "table", "chair", "bed", "sofa", "lamp", "television", "computer", "phone", "book", "pen", "pencil", "paper", "keyboard", "mouse", "monitor", "printer", "car", "truck", "bus", "train", "airplane", "boat", "house", "apartment", "school", "hospital", "park", "library", "museum", "zoo", "aquarium", "planet", "star", "sun", "moon", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "galaxy", "universe", "cloud", "rain", "sun", "wind", "snow", "fire", "water", "earth", "air", "tree", "flower", "grass", "animal", "bird", "fish", "insect", "rock", "stone", "mountain", "river", "lake", "ocean", "desert", "forest", "jungle", "beach", "city", "country", "continent", "world"
]; 

let randomWord = '';

async function generateScrambledWord() {
  randomWord = words[Math.floor(Math.random() * words.length)]; 
  const scrambledWord = shuffleLetters(randomWord); 
  scrambledWordElement.textContent = scrambledWord; 
}

function shuffleLetters(word) {
  let shuffledWord = [...word].sort(() => Math.random() - 0.5).join(''); 
  return shuffledWord; 
}

function checkGuess(guess) {
  if (guess.toLowerCase() === randomWord.toLowerCase()) {
    feedbackElement.textContent = 'Correct!';
    generateScrambledWord();
  } else {
    feedbackElement.textContent = 'Incorrect. Try again.'; 
  }
}

submitButton.addEventListener('click', () => {
  const guess = guessInput.value; 
  checkGuess(guess); 
  guessInput.value = ''; 
});
skipButton.addEventListener('click', () => {
  feedbackElement.textContent = 'The word was '+randomWord+'.';
  generateScrambledWord();
  guessInput.value = ''; 
});

generateScrambledWord();
