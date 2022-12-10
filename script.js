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
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    setTimeout(() => {
      if (count === cards.length);
    }, 1500);
} else {
  setTimeout(function() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }, 1500);
} 
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffle();
cards.forEach((card) => card.addEventListener('click', flipCard));

resetBtn.addEventListener("click", resetBtn);

function resetBtn() {
  cards.forEach((card) => card.classList.remove("flip"));
  setTimeout(() => {
    shuffle();
    cards.forEach((card) => card.removeEventListener("click", flipCard));
    cards.forEach((card) => card.addEventListener("click", flipCard));
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    count = 0;
  }, 1000);
}