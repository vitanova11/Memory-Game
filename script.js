const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;
let count = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = null; 
  } else {
    hasFlippedCard = false;
    secondCard = null;

  checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    count += 2;
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard = null;
    secondCard = null;
} else {
  setTimeout(function() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard = null;
    secondCard = null;
  }, 1500);
} 
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));

let restartBtn = document.getElementById("reset");
  restartBtn.addEventListener("click", restartBtn);