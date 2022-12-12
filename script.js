const cards = document.querySelectorAll('.memory-card');

let lockBoard = false;
let firstCard = null;
let secondCard = null;
let score = 0;

function flipCard(e) {
  const clickedCard = e.currentTarget;

  // flow control to restrict clicks
  if (
      (clickedCard === firstCard) ||
      lockBoard) {
    return;
  }
  // action to flip card
  clickedCard.classList.add('flip');

  // if the first card is set, set clickedCard to secondCard. if no cards have been clicked, set as first card
  if (firstCard) {
    secondCard = clickedCard;
  } else {
    firstCard = clickedCard;
  }

  if (firstCard && secondCard) {
    // lock the board while we check if it's correct
    lockBoard = true;
    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    // increment score if they got a match
    score += 2;
    // make the cards unclickable if a match was found
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    reflipCards();
  } else {
    setTimeout(function () {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      reflipCards();
    }, 1500);
  }
}

// reduce redundant code with a function
function reflipCards() {
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffle();
cards.forEach((card) => card.addEventListener('click', flipCard));

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', onReset);
function onReset() {
  cards.forEach((card) => card.classList.remove("flip"));
  setTimeout(() => {
    shuffle();
    cards.forEach((card) => card.removeEventListener("click", flipCard));
    cards.forEach((card) => card.addEventListener("click", flipCard));
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    score = 0;
  }, 1000);
}