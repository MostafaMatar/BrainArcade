const cardValues = ['Dog', 'Apple', 'Paris', 'Daisy', 'Ford', 'Star', 
                    'Yoda', 'Tree', 'Frog', 'Moon', 'Magic', 'Gold',
                    'Baby', 'Shark', 'Snake', 'Drama', 'Ruby', 'Cairo',
                    'Witch', 'Salt', 'Fiji', 'Clay', 'Dark', 'Zink'
                  ]; 
cardValues.sort(() => Math.random() - 0.5); 

const gameBoard = document.getElementById('game-board'); 

let flippedCards = []; 
let matchedCards = []; 
let cards = [];

for (let i = 0; i < 12; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = cardValues[Math.floor(i/2)];
  card.textContent = '?'; 
  card.addEventListener('click', flipCard); 
  cards.push(card);
}
cards.sort(() => Math.random() - 0.5); 
cards.forEach((card) => gameBoard.appendChild(card));

function flipCard(event) {
  const card = event.target; 
  card.textContent = card.dataset.value; 
  if(!flippedCards.includes(card)){
    flippedCards.push(card); 
  } 

  if (flippedCards.length === 2) {
    checkForMatch(); 
  } 
} 

function checkForMatch() {
  const card1 = flippedCards[0]; 
  const card2 = flippedCards[1]; 

  if (card1.dataset.value === card2.dataset.value) {
    matchedCards.push(card1, card2); 
    card1.classList.add('match'); 
    card2.classList.add('match'); 
    flippedCards = []; 
  } else {
    setTimeout(() => {
      card1.textContent = '?'; 
      card2.textContent = '?'; 
      flippedCards = []; 
    }, 1000); 
  } 
}
